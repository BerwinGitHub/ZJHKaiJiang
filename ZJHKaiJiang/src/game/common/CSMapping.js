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
        EXIT_ROOM: "exitRoom",
        GAMEING: "gameing",

        USER_PREPARE: "userPrepare",
    },
    S2C: { // SERVER TO CLIENT

        LOGIN_SUCCESS: "loginSuccess",
        LOGIN_FAILED: "loginFailed",

        USER_EXIT_TABLE: "userExitTable", // 玩家退出桌子  Prrotobuf -> Seat
        USER_ENTER_TABLE: "userEnterTable", // 玩家进入桌子  Prrotobuf -> Seat
        ENTER_TABLE_SUCCESS: "enterTableSuccess", // 创建桌子成功
        ENTER_TABLE_FAILED: "enterTableFailed", // 创建桌子失败

        USER_PREPARED: "userPrepared", // 玩家准备 Prrotobuf -> Seat
    },
};