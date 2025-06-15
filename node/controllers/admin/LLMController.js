const LLMService = require("../../services/admin/LLMService");
const { clearLLMCache } = require("../../services/web/LLMService");

const LLMController = {
    addmodel: async (req, res) => {
        const { modelName, modelValue ,isPublish} = req.body;
        await LLMService.addmodel({ 
            modelName, 
            modelValue,
            isPublish,
            editTime:new Date()
         })
        // 添加模型后清除缓存
        clearLLMCache();
        res.send({
            code: 200,
            mActionType: "OK", 
        })
        
    },
    getmodellist: async (req, res) => {
        const result = await LLMService.getmodel()
        res.send({
            code: 200,
            mActionType: "OK",
            data: result
        })
    },
    updatempdelinfo: async (req, res) => {
        const { modelName, modelValue,_id} = req.body;
        await LLMService.updatempdelinfo({ modelName, modelValue,_id })
        // 更新模型后清除缓存
        clearLLMCache();
        res.send({
            code: 200,
            mActionType: "OK",
        })
    },
    deletemodel: async (req, res) => {
        const {id} = req.params;
        await LLMService.deletemodel({_id:id})
        // 删除模型后清除缓存
        clearLLMCache();
        res.send({
            code: 200,
            mActionType: "OK", 
        })
    },
    changestatus: async (req, res) => {
        const {_id,isPublish} = req.body;
        await LLMService.changestatus({_id,isPublish})
        // 更改状态后清除缓存
        clearLLMCache();
        res.send({
            code: 200,
            mActionType: "OK",
        })
    }
}

module.exports = LLMController