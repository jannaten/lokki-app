const fs = require("fs");
const db = require("../models");

async function image_auth(req, res, next) {
  const { form, avatar } = db;
  const { formId, userId } = req.body;

  if (req.user.role !== "root") {
    if (req.user.id !== Number(userId)) {
      return res.status(403).send({
        error: "FORBIDDEN: You are not allowed",
      });
    }
  }

  if (formId && userId) {
    const form_find = await form.findAll({
      where: { userId, id: formId },
    });

    if (!form_find[0]) {
      return res.status(400).send({
        error: `No form exist to upload attachments for user id ${userId}`,
      });
    }
    next();
  } else if (userId && !formId) {
    const attachmentUserAvatar = await avatar.findAll({
      where: { userId },
    });
    if (attachmentUserAvatar.length !== 0) {
      const fileName = attachmentUserAvatar[0].value.split(
        "/attachments/avatar/"
      )[1];
      const path = `./public/images/avatar/${fileName}`;
      fs.unlink(path, (err) => {
        if (err) {
          console.error(err);
          return;
        }
      });
      await avatar.destroy({ where: { id: attachmentUserAvatar[0].id } });
      next();
    }
  }
}

module.exports = { image_auth };
