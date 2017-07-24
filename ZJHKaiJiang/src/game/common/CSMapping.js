/**
 * Created by Berwin on 2017/7/20.
 */
var CSMapping = {
    C2S: { // CLIENT TO SERVER
        LOGIN: "login",
        MESSAGE: "message",
        QUICK_START: "quickStart",
        CREATE_ROOM: "createRoom",
        JOIN_ROOM: "joinRoom",
        GAMEL: "game",
    },
    S2C: { // SERVER TO CLIENT
        LOGIN_SUCCESS: "loginSuccess",
        LOGIN_FAILED: "loginFailed",

        USER_EXIT_TABLE: "userExitTable", // 玩家退出桌子
        USER_ENTER_TABLE: "userEnterTable", // 玩家进入桌子
        MATCHED_TABLE_SUCCESS: "matchTableSuccess", // 匹配/加入桌子成功
        MATCHED_TABLE_FAILED: "matchTableFailed", // 匹配/加入桌子失败
        CREATE_TABLE_SUCCESS: "createTableSuccess", // 创建桌子成功
        CREATE_TABLE_FAILED: "createTableFailed", // 创建桌子失败
    },
};