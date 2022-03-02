const sharp = require("sharp");

async function image_save(req, res, next) {
  const { file } = req;
  if (!file) {
    return res.status(400).send("Empty image");
  }
  if (!file.mimetype.startsWith("image")) {
    return res.status(400).send("Not image type");
  }
  const { formId, userId, formTypeId, attachmentTypeId } = req.body;
  if (formId && userId && formTypeId && attachmentTypeId) {
    req.file.filename = `img-${userId}-${formId}-${formTypeId}-${attachmentTypeId}-${Date.now()}.jpeg`;
    sharp(req.file.buffer)
      .toFormat("jpeg")
      .jpeg({ quality: 90 })
      .toFile(`public/images/blogs/${req.file.filename}`);
  }
  if (!formId && userId && !formTypeId && attachmentTypeId) {
    req.file.filename = `img-avatar-${userId}-${attachmentTypeId}-${Date.now()}.jpeg`;
    sharp(req.file.buffer)
      .resize(240, 240)
      .toFormat("jpeg")
      .toFile(`public/images/avatar/${req.file.filename}`);
  }
  next();
}

module.exports = { image_save };
