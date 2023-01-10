const { Files } = require("../models/files");

module.exports = {
  create: async (data) => {
    const file = new Files(data);

    return await file.save();
  },

  getFilesByUserId: async (uploadedBy, limit, skip) => {
    const total = await Files.countDocuments({ uploadedBy });
    const files = await Files.find({ uploadedBy })
      .populate({
        path: "uploadedBy",
        select: "name"
      })
      .skip(skip)
      .limit(limit);
    return { files, total };
  },

  getFiles: async (limit, skip) => {
    const total = await Files.countDocuments({});
    const files = await Files.find()
      .populate({
        path: "uploadedBy",
        select: "name"
      })
      .skip(skip)
      .limit(limit);
    return { files, total };
  },

  getFile: async (fileId) => {
    return await Files.findById(fileId);
  }
};
