/**
 * 客户端和服务器socket的动作对应表<br/>
 * 客户端和服务器保持一致
 * Created by Berwin on 2017/7/19.
 */

var CSMapping = {
    // client to server
    C2S_LOGIN: "login", // 客户端请求登录
    C2S_MESSAGE: "message", // 客户端发送消息
    C2S_CREATE_ROOM: "createRoom",
    C2S_JOIN_ROOM: "joinRoom",
    C2S_GAME: "game",

    // server to client
    S2C_LOGIN_SUCCESS: "loginSuccess",
    S2C_LOGIN_FAILED: "loginFailed",
};
