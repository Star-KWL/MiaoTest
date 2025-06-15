const  chat = require('../../llm/web/chat.js')
const AianalysisModel = require('../../models/AianalysisModel')
const LLMsModel = require('../../models/LLMsModel')

// LLM模型列表缓存
let cachedLLMList = null;
let lastCacheUpdate = 0;
const CACHE_DURATION = 3600000; // 缓存有效期1小时

const LLMService = {
    sendExamAIanalyse: async (message, questionId,Type) => { 
        // 先查询数据库
        const existingAnalysis = await AianalysisModel.findOne({ questionId });
        if (existingAnalysis) {
            return {
                Aidata: existingAnalysis.analysecontent ,
                modelName:existingAnalysis.modelName,
            }// 如果存在，直接返回分析结果
        }
        
        // 如果没有找到，调用AI接口
        const result = await chat.postExamAIanalyse(message);
        
        // 将结果存入数据库
        await AianalysisModel.create({
            questionId,
            questionType: Type, // 添加题目类型
            questionContent: message, // 添加题目内容
            analysecontent: result.Aidata,// 添加分析内容
            createdTime: new Date(),
            modelName: result.modelName // 添加模型名称
        });
        return result;
    },
    UserChat: async (message,model) => {
        return await chat.postUserChat(message,model)
    },
    getLLMList: async () => {
        const now = Date.now();
        // 检查缓存是否有效
        if (cachedLLMList && (now - lastCacheUpdate) < CACHE_DURATION) {
            console.log("使用缓存的LLM列表");
            return cachedLLMList;
        }
        // 缓存无效，从数据库获取最新列表
        console.log("从数据库更新LLM列表");
        const result = await LLMsModel.find({ isPublish: 1 });
        cachedLLMList = result;
        lastCacheUpdate = now;
        return result;
    },
    // 清除LLM缓存
    clearLLMCache: () => {
        cachedLLMList = null;
        lastCacheUpdate = 0;
        console.log("LLM列表缓存已清除");
    }

}
module.exports = LLMService
