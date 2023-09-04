import { ElMessage } from "element-plus";
import req from "../utils/req";


class postService {

    /**
 * 通过帖子类型 获取帖子内容
 * @param type 帖子类型
 * @param current 页数
 * @param size 容量
 */
    static getPostListByType = (type: string, current: number, size: number) => {
        return req.get("/post/api/getPostList/" + type + "/" + current + "/" + size);
    }

        /**
 * 通过帖子id 获取帖子内容
 * @param pid 帖子id
 */
         static getPostListById = (pid: number) => {
            return req.get("/post/api/getPostList/" + pid );
        }

        /**
         * 发布帖子
         * @param data 数据
         * @returns 
         */
        static createPost = (data:any)=>{
            req.post("/post/createPost",data).then(res=>{
            console.log(res);
            ElMessage.success(res.data.msg);
            }).catch(err=>{
                console.log(err);
            })
        }

}




export default {
    postService
}