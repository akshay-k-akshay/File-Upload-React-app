const { Files } = require("../models/files");

module.exports = {
  create: async (data) => {
    const file = new Files(data);

    return await file.save();
  },

  getFilesByUserId: async (uploadedBy, search, limit, skip) => {
    const total = await Files.countDocuments({ uploadedBy, name: { $regex: search } });
    const files = await Files.find({ uploadedBy, name: { $regex: search } })
      .populate({
        path: "uploadedBy",
        select: "name"
      })
      .skip(skip)
      .limit(limit);
    return { files, total };
  },

  getFiles: async (search, limit, skip) => {
    const total = await Files.countDocuments({ name: { $regex: search } });
    const files = await Files.find({ name: { $regex: search } })
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
