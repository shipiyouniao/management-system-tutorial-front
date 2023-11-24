import service from '@/utils/axios'
import Result from '@/types/Result'
import User from '@/types/User'

/**
 * @description 用户相关api
 */
class UserApi {
    /**
     * @description 获取用户列表
     * @return {Promise<User[] | null>} 用户列表
     */
    public static async getUserList(): Promise<User[] | null> {
        let res: Result<User[] | null> = null;

        for (let i = 0; i < 10; i++) {
            res = await service.get('/user/list');

            if (res) {
                break;
            }

            await new Promise<void>((resolve) => {
                setTimeout(() => {
                    resolve();
                }, 500);
            });
        }

        if (res.code === 200) {
            return res.data;
        } else {
            return null;
        }
    }

    /**
     * @description 获取用户信息
     * @param {number} id 用户id
     * @return {Promise<User | null>} 用户信息
     */
    public static async getById(id: number): Promise<User | null> {
        let res: Result<User | null> = null;

        for (let i = 0; i < 10; i++) {
            res = await service.get('/user/getById', { id: id });

            if (res) {
                break;
            }

            await new Promise<void>((resolve) => {
                setTimeout(() => {
                    resolve();
                }, 500);
            });
        }

        if (res.code === 200) {
            return res.data;
        } else {
            return null;
        }
    }

    /**
     * @description 添加用户
     * @param {User} user 用户信息
     * @return {Promise<boolean>} 是否添加成功
     */
    public static async save(user: User): Promise<boolean> {
        let res: Result<boolean> = null;

        for (let i = 0; i < 10; i++) {
            res = await service.post('/user/save', user);

            if (res) {
                break;
            }

            await new Promise<void>((resolve) => {
                setTimeout(() => {
                    resolve();
                }, 500);
            });
        }

        if (res.code === 200) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * @description 更新用户
     * @param {User} user 用户信息
     * @return {Promise<boolean>} 是否更新成功
     */
    public static async update(user: User): Promise<boolean> {
        let res: Result<boolean> = null;

        for (let i = 0; i < 10; i++) {
            res = await service.post('/user/update', user);

            if (res) {
                break;
            }

            await new Promise<void>((resolve) => {
                setTimeout(() => {
                    resolve();
                }, 500);
            });
        }

        if (res.code === 200) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * @description 删除用户
     * @param {number} id 用户id
     * @return {Promise<boolean>} 是否删除成功
     */
    public static async delete(id: number): Promise<boolean> {
        let res: Result<boolean> = null;

        for (let i = 0; i < 10; i++) {
            res = await service.get('/user/delete', { id: id });

            if (res) {
                break;
            }

            await new Promise<void>((resolve) => {
                setTimeout(() => {
                    resolve();
                }, 500);
            });
        }

        if (res.code === 200) {
            return true;
        } else {
            return false;
        }
    }
}

export default UserApi;