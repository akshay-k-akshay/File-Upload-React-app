const { StatusCodes } = require("http-status-codes");

const fileService = require("../services/files");

module.exports = {
  upload: async (req, res, next) => {
    try {
      await fileService.upload(req.user._id, req.body, req.file);
      return res.status(StatusCodes.OK).json({
        message: "File Uploaded Successfully",
        data: {}
      });
    } catch (error) {
      next(error);
    }
  },

  list: async (req, res, next) => {
    try {
      let { page, limit, searchText } = req.query;
      page = parseInt(page) || 1;
      limit = parseInt(limit) || 10;
      const result = await fileService.list(req.user, searchText, page, limit);
      return res.status(StatusCodes.OK).json({
        message: "User Registerd Successfully",
        ...result
      });
    } catch (error) {
      next(error);
    }
  },

  getFile: async (req, res, next) => {
    try {
      const file = await fileService.getFile(req.params.id)
      return res.download(file);
    } catch (error) {
      next(error);
    }
  }
};
