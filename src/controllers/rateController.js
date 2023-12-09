// import { Sequelize } from "sequelize";
import sequelize from "../models/connect.js";
import initModels from "../models/init-models.js";
import responseData from "../config/response.js";

const { rate_res, restaurant, users } = initModels(sequelize);
// const Op = Sequelize.Op;

export const getRateByUserId = async (req, res) => {
  try {
    let { userId: user_id } = req.params;

    let data = await rate_res.findAll({
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

export const getRateByResId = async (req, res) => {
  try {
    let { resId: res_id } = req.params;

    let data = await rate_res.findAll({
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

export const rateRes = async (req, res) => {
  try {
    let { userId: user_id, resId: res_id, amount } = req.body;
    let where = {
      res_id,
      user_id,
    };
    let data = await rate_res.findOne({
      where,
    });
    let date_rate = new Date();
    if (data) {
      rate_res.update(
        {
          user_id,
          res_id,
          amount,
          date_rate,
        },
        where
      );
      responseData(res, "Đánh giá thành công", "", 200);
    } else {
      like_res.create({
        user_id,
        res_id,
        amount,
        date_rate,
      });
      responseData(res, "Đánh giá thành công", "", 200);
    }
  } catch {
    responseData(res, "Lỗi", "", 500);
  }
};
