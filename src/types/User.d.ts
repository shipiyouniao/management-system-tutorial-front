/**
 * 用户信息
 * @property {number} id 用户id
 * @property {string} username 用户名
 * @property {string} pwd 用户密码
 * @property {string} nickname 用户昵称
 * @property {string} avatar 用户头像
 * @property {number | Date} birthday 用户生日(时间戳)
 * @property {number} gmtCreated 用户创建时间(时间戳)
 * @property {number} gmtModified 用户修改时间(时间戳)
 */
interface User {
    id?: number;
    username: string;
    pwd: string;
    nickname: string;
    avatar?: string;
    birthday: number | Date;
    gmtCreated: number;
    gmtModified: number;
}

export default User;