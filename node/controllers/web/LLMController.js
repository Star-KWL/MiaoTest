const LLMService = require("../../services/web/LLMService");
const QuestionMap = require("../../MiddleWares/questionMap");

const LLMController = {
  sendExamAIanalyse: async (req, res) => {
    try {
      const { message, QuestionID, Type, prompt } = req.body; // 从请求体中获取问题和题目ID,如果QuestionID不存在，则调用大模型api获得
      const map = QuestionMap(message, Type); // 调用中间件的QuestionMap方法
      const newmessage = prompt + ":" + map; // 拼接提示词和映射后的问题
      console.log(`问题: ${newmessage} 题目ID: ${QuestionID} 题目类型: ${Type}`);
      const result = await LLMService.sendExamAIanalyse(
        newmessage,
        QuestionID,
        Type
      ); // 调用服务层的sendExamAIanalyse方法
      res.send({
        code: 200,
        ActionType: "OK",
        data: result, // 返回服务层的响应结果
      });
    } catch (error) {
      console.error("Error fetching sendExamAIanalyse details:", error); // 处理错误
    }
  },
  UserChat: async (req, res) => {
    try {
      const { message, model } = req.body;
      console.log("用户输入的问题:", message, "模型:", model);

      // 检查模型是否存在
      const models = await LLMService.getLLMList();
      const modelExists = models.some((m) => m.modelValue === model);
      if (!modelExists) {
        return res.send({
          code: 400,
          ActionType: "ERROR",
          message: "模型不存在，请选择有效的模型",
        });
      }

      const result = await LLMService.UserChat(message, model);
      res.send({
        code: 200,
        ActionType: "OK",
        data: result, // 返回服务层的响应结果
      });
    } catch (error) {
      console.error("Error fetching UserChat details:", error); // 处理错误
      res.send({
        code: 500,
        ActionType: "ERROR",
        message: "服务器内部错误",
      });
    }
  },
  getLLMList: async (req, res) => {
    try {
      const result = await LLMService.getLLMList();
      res.send({
        code: 200,
        ActionType: "OK",
        data: result,
      });
    } catch (error) {
      console.error("Error fetching getLLMList details:", error);
      res.send({
        code: 500,
        ActionType: "ERROR",
        message: "获取模型列表失败",
      });
    }
  },
};
module.exports = LLMController;
