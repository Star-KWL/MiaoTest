//大模型生成对话
import axios from "axios";
const postUserUserChat = async (message,model) => {
    try {
        const res = await axios.post("/webapi/UserChat/postUserChat", {message,model});
       if (res.data.code === 200) {
            return res.data;
        }
        return null;
    }catch (error) {
        console.log(error);
        throw error;
    }
}
export default postUserUserChat;
