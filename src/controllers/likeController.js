// import { Sequelize } from "sequelize";
import sequelize from "../models/connect.js";
import initModels from "../models/init-models.js";
import responseData from "../config/response.js";

const { like_res, restaurant, users } = initModels(sequelize);
// const Op = Sequelize.Op;

export const getLikesByUserId = async (req, res) => {
  try {
    let { userId: user_id } = req.params;

    let data = await like_res.findAll({
      where: {
        user_id,
      },
      include: [restaurant],
    });

    responseData(res, "Lấy danh sách thành công", data, 200);
  } catch {
    responseData(res, "Lỗi", "", 500);
  }
};

export const getLikesByResId = async (req, res) => {
  try {
    let { resId: res_id } = req.params;

    let data = await like_res.findAll({
      where: {
        res_id,
      },
      include: [users],
    });

    responseData(res, "Lấy danh sách thành công", data, 200);
  } catch {
    responseData(res, "Lỗi", "", 500);
  }
};

export const toggleLikeRes = async (req, res) => {
  try {
    let { userId: user_id, resId: res_id } = req.body;
    let where = {
      res_id,
      user_id,
    };
    let data = await like_res.findOne({
      where,
    });

    if (data) {
      like_res.destroy({
        where,
      });
      responseData(res, "Unlike thành công", "", 200);
    } else {
      let date_like = new Date();
      like_res.create({
        user_id,
        res_id,
        date_like,
      });
      responseData(res, "Like thành công", "", 200);
    }
  } catch {
    responseData(res, "Lỗi", "", 500);
  }
};
