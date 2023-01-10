const fs = require("fs");
const path = require("path");
const Files = require("../db/files");
const { BadRequestError } = require("../errors");

module.exports = {
  upload: async (uploadedBy, data, file) => {
    if (!file) {
      throw new BadRequestError("files is required");
    }
    if (file.mimetype != "application/pdf") {
      deleteFile(file.path);
      throw new BadRequestError(
        "only pdf file is supported please upload a valid file"
      );
    }
    return await Files.create({
      name: data.name,
      path: file.filename,
      uploadedBy
    });
  },

  list: async ({ isAdmin, id }, page, limit) => {
    const skip = (page - 1) * limit;
    let result = {};
    if (isAdmin) {
      result = await Files.getFiles(limit, skip);
    } else {
      result = await Files.getFilesByUserId(id, limit, skip);
    }
    return {
      data: result.files,
      meta: {
        page,
        limit,
        total: result.total
      }
    };
  },

  getFile: async (fileId) => {
    const file = await Files.getFile(fileId);
    return path.join(__dirname, '../../public/', file.path)
  }
};

async function deleteFile(path) {
  fs.unlink(path, (err) => {
    if (err) {
      console.log("error", err);
    }
  });
}
