/*eslint-disable block-scoped-var, no-redeclare, no-control-regex, no-prototype-builtins*/
"use strict";

var $protobuf = protobuf;

// Common aliases
var $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

// Exported root namespace
var $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

$root.User = (function() {

    /**
     * Properties of a User.
     * @exports IUser
     * @interface IUser
     * @property {string} [objectId] User objectId
     * @property {string} [username] User username
     * @property {boolean} [mobilePhoneNumberVerified] User mobilePhoneNumberVerified
     * @property {string} [mobilePhoneNumber] User mobilePhoneNumber
     * @property {number} [totalInning] User totalInning
     * @property {number} [winInning] User winInning
     * @property {number} [diamond] User diamond
     * @property {number} [coin] User coin
     * @property {string} [deviceId] User deviceId
     * @property {number} [id] User id
     * @property {string} [authData] User authData
     * @property {number|Long} [createdAt] User createdAt
     * @property {number|Long} [updatedAt] User updatedAt
     * @property {boolean} [placement] User placement
     * @property {string} [headerUrl] User headerUrl
     */

    /**
     * Constructs a new User.
     * @exports User
     * @classdesc Represents a User.
     * @constructor
     * @param {IUser=} [properties] Properties to set
     */
    function User(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * User objectId.
     * @member {string}objectId
     * @memberof User
     * @instance
     */
    User.prototype.objectId = "";

    /**
     * User username.
     * @member {string}username
     * @memberof User
     * @instance
     */
    User.prototype.username = "";

    /**
     * User mobilePhoneNumberVerified.
     * @member {boolean}mobilePhoneNumberVerified
     * @memberof User
     * @instance
     */
    User.prototype.mobilePhoneNumberVerified = false;

    /**
     * User mobilePhoneNumber.
     * @member {string}mobilePhoneNumber
     * @memberof User
     * @instance
     */
    User.prototype.mobilePhoneNumber = "";

    /**
     * User totalInning.
     * @member {number}totalInning
     * @memberof User
     * @instance
     */
    User.prototype.totalInning = 0;

    /**
     * User winInning.
     * @member {number}winInning
     * @memberof User
     * @instance
     */
    User.prototype.winInning = 0;

    /**
     * User diamond.
     * @member {number}diamond
     * @memberof User
     * @instance
     */
    User.prototype.diamond = 0;

    /**
     * User coin.
     * @member {number}coin
     * @memberof User
     * @instance
     */
    User.prototype.coin = 0;

    /**
     * User deviceId.
     * @member {string}deviceId
     * @memberof User
     * @instance
     */
    User.prototype.deviceId = "";

    /**
     * User id.
     * @member {number}id
     * @memberof User
     * @instance
     */
    User.prototype.id = 0;

    /**
     * User authData.
     * @member {string}authData
     * @memberof User
     * @instance
     */
    User.prototype.authData = "";

    /**
     * User createdAt.
     * @member {number|Long}createdAt
     * @memberof User
     * @instance
     */
    User.prototype.createdAt = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

    /**
     * User updatedAt.
     * @member {number|Long}updatedAt
     * @memberof User
     * @instance
     */
    User.prototype.updatedAt = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

    /**
     * User placement.
     * @member {boolean}placement
     * @memberof User
     * @instance
     */
    User.prototype.placement = false;

    /**
     * User headerUrl.
     * @member {string}headerUrl
     * @memberof User
     * @instance
     */
    User.prototype.headerUrl = "";

    /**
     * Creates a new User instance using the specified properties.
     * @function create
     * @memberof User
     * @static
     * @param {IUser=} [properties] Properties to set
     * @returns {User} User instance
     */
    User.create = function create(properties) {
        return new User(properties);
    };

    /**
     * Encodes the specified User message. Does not implicitly {@link User.verify|verify} messages.
     * @function encode
     * @memberof User
     * @static
     * @param {IUser} message User message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    User.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.objectId != null && message.hasOwnProperty("objectId"))
            writer.uint32(/* id 1, wireType 2 =*/10).string(message.objectId);
        if (message.username != null && message.hasOwnProperty("username"))
            writer.uint32(/* id 2, wireType 2 =*/18).string(message.username);
        if (message.mobilePhoneNumberVerified != null && message.hasOwnProperty("mobilePhoneNumberVerified"))
            writer.uint32(/* id 3, wireType 0 =*/24).bool(message.mobilePhoneNumberVerified);
        if (message.mobilePhoneNumber != null && message.hasOwnProperty("mobilePhoneNumber"))
            writer.uint32(/* id 4, wireType 2 =*/34).string(message.mobilePhoneNumber);
        if (message.totalInning != null && message.hasOwnProperty("totalInning"))
            writer.uint32(/* id 5, wireType 0 =*/40).int32(message.totalInning);
        if (message.winInning != null && message.hasOwnProperty("winInning"))
            writer.uint32(/* id 6, wireType 0 =*/48).int32(message.winInning);
        if (message.diamond != null && message.hasOwnProperty("diamond"))
            writer.uint32(/* id 7, wireType 0 =*/56).int32(message.diamond);
        if (message.coin != null && message.hasOwnProperty("coin"))
            writer.uint32(/* id 8, wireType 0 =*/64).int32(message.coin);
        if (message.deviceId != null && message.hasOwnProperty("deviceId"))
            writer.uint32(/* id 9, wireType 2 =*/74).string(message.deviceId);
        if (message.id != null && message.hasOwnProperty("id"))
            writer.uint32(/* id 10, wireType 0 =*/80).int32(message.id);
        if (message.authData != null && message.hasOwnProperty("authData"))
            writer.uint32(/* id 11, wireType 2 =*/90).string(message.authData);
        if (message.createdAt != null && message.hasOwnProperty("createdAt"))
            writer.uint32(/* id 12, wireType 0 =*/96).uint64(message.createdAt);
        if (message.updatedAt != null && message.hasOwnProperty("updatedAt"))
            writer.uint32(/* id 13, wireType 0 =*/104).uint64(message.updatedAt);
        if (message.placement != null && message.hasOwnProperty("placement"))
            writer.uint32(/* id 14, wireType 0 =*/112).bool(message.placement);
        if (message.headerUrl != null && message.hasOwnProperty("headerUrl"))
            writer.uint32(/* id 15, wireType 2 =*/122).string(message.headerUrl);
        return writer;
    };

    /**
     * Encodes the specified User message, length delimited. Does not implicitly {@link User.verify|verify} messages.
     * @function encodeDelimited
     * @memberof User
     * @static
     * @param {IUser} message User message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    User.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a User message from the specified reader or buffer.
     * @function decode
     * @memberof User
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {User} User
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    User.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.User();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.objectId = reader.string();
                break;
            case 2:
                message.username = reader.string();
                break;
            case 3:
                message.mobilePhoneNumberVerified = reader.bool();
                break;
            case 4:
                message.mobilePhoneNumber = reader.string();
                break;
            case 5:
                message.totalInning = reader.int32();
                break;
            case 6:
                message.winInning = reader.int32();
                break;
            case 7:
                message.diamond = reader.int32();
                break;
            case 8:
                message.coin = reader.int32();
                break;
            case 9:
                message.deviceId = reader.string();
                break;
            case 10:
                message.id = reader.int32();
                break;
            case 11:
                message.authData = reader.string();
                break;
            case 12:
                message.createdAt = reader.uint64();
                break;
            case 13:
                message.updatedAt = reader.uint64();
                break;
            case 14:
                message.placement = reader.bool();
                break;
            case 15:
                message.headerUrl = reader.string();
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a User message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof User
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {User} User
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    User.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a User message.
     * @function verify
     * @memberof User
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    User.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.objectId != null && message.hasOwnProperty("objectId"))
            if (!$util.isString(message.objectId))
                return "objectId: string expected";
        if (message.username != null && message.hasOwnProperty("username"))
            if (!$util.isString(message.username))
                return "username: string expected";
        if (message.mobilePhoneNumberVerified != null && message.hasOwnProperty("mobilePhoneNumberVerified"))
            if (typeof message.mobilePhoneNumberVerified !== "boolean")
                return "mobilePhoneNumberVerified: boolean expected";
        if (message.mobilePhoneNumber != null && message.hasOwnProperty("mobilePhoneNumber"))
            if (!$util.isString(message.mobilePhoneNumber))
                return "mobilePhoneNumber: string expected";
        if (message.totalInning != null && message.hasOwnProperty("totalInning"))
            if (!$util.isInteger(message.totalInning))
                return "totalInning: integer expected";
        if (message.winInning != null && message.hasOwnProperty("winInning"))
            if (!$util.isInteger(message.winInning))
                return "winInning: integer expected";
        if (message.diamond != null && message.hasOwnProperty("diamond"))
            if (!$util.isInteger(message.diamond))
                return "diamond: integer expected";
        if (message.coin != null && message.hasOwnProperty("coin"))
            if (!$util.isInteger(message.coin))
                return "coin: integer expected";
        if (message.deviceId != null && message.hasOwnProperty("deviceId"))
            if (!$util.isString(message.deviceId))
                return "deviceId: string expected";
        if (message.id != null && message.hasOwnProperty("id"))
            if (!$util.isInteger(message.id))
                return "id: integer expected";
        if (message.authData != null && message.hasOwnProperty("authData"))
            if (!$util.isString(message.authData))
                return "authData: string expected";
        if (message.createdAt != null && message.hasOwnProperty("createdAt"))
            if (!$util.isInteger(message.createdAt) && !(message.createdAt && $util.isInteger(message.createdAt.low) && $util.isInteger(message.createdAt.high)))
                return "createdAt: integer|Long expected";
        if (message.updatedAt != null && message.hasOwnProperty("updatedAt"))
            if (!$util.isInteger(message.updatedAt) && !(message.updatedAt && $util.isInteger(message.updatedAt.low) && $util.isInteger(message.updatedAt.high)))
                return "updatedAt: integer|Long expected";
        if (message.placement != null && message.hasOwnProperty("placement"))
            if (typeof message.placement !== "boolean")
                return "placement: boolean expected";
        if (message.headerUrl != null && message.hasOwnProperty("headerUrl"))
            if (!$util.isString(message.headerUrl))
                return "headerUrl: string expected";
        return null;
    };

    /**
     * Creates a User message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof User
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {User} User
     */
    User.fromObject = function fromObject(object) {
        if (object instanceof $root.User)
            return object;
        var message = new $root.User();
        if (object.objectId != null)
            message.objectId = String(object.objectId);
        if (object.username != null)
            message.username = String(object.username);
        if (object.mobilePhoneNumberVerified != null)
            message.mobilePhoneNumberVerified = Boolean(object.mobilePhoneNumberVerified);
        if (object.mobilePhoneNumber != null)
            message.mobilePhoneNumber = String(object.mobilePhoneNumber);
        if (object.totalInning != null)
            message.totalInning = object.totalInning | 0;
        if (object.winInning != null)
            message.winInning = object.winInning | 0;
        if (object.diamond != null)
            message.diamond = object.diamond | 0;
        if (object.coin != null)
            message.coin = object.coin | 0;
        if (object.deviceId != null)
            message.deviceId = String(object.deviceId);
        if (object.id != null)
            message.id = object.id | 0;
        if (object.authData != null)
            message.authData = String(object.authData);
        if (object.createdAt != null)
            if ($util.Long)
                (message.createdAt = $util.Long.fromValue(object.createdAt)).unsigned = true;
            else if (typeof object.createdAt === "string")
                message.createdAt = parseInt(object.createdAt, 10);
            else if (typeof object.createdAt === "number")
                message.createdAt = object.createdAt;
            else if (typeof object.createdAt === "object")
                message.createdAt = new $util.LongBits(object.createdAt.low >>> 0, object.createdAt.high >>> 0).toNumber(true);
        if (object.updatedAt != null)
            if ($util.Long)
                (message.updatedAt = $util.Long.fromValue(object.updatedAt)).unsigned = true;
            else if (typeof object.updatedAt === "string")
                message.updatedAt = parseInt(object.updatedAt, 10);
            else if (typeof object.updatedAt === "number")
                message.updatedAt = object.updatedAt;
            else if (typeof object.updatedAt === "object")
                message.updatedAt = new $util.LongBits(object.updatedAt.low >>> 0, object.updatedAt.high >>> 0).toNumber(true);
        if (object.placement != null)
            message.placement = Boolean(object.placement);
        if (object.headerUrl != null)
            message.headerUrl = String(object.headerUrl);
        return message;
    };

    /**
     * Creates a plain object from a User message. Also converts values to other types if specified.
     * @function toObject
     * @memberof User
     * @static
     * @param {User} message User
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    User.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.defaults) {
            object.objectId = "";
            object.username = "";
            object.mobilePhoneNumberVerified = false;
            object.mobilePhoneNumber = "";
            object.totalInning = 0;
            object.winInning = 0;
            object.diamond = 0;
            object.coin = 0;
            object.deviceId = "";
            object.id = 0;
            object.authData = "";
            if ($util.Long) {
                var long = new $util.Long(0, 0, true);
                object.createdAt = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
            } else
                object.createdAt = options.longs === String ? "0" : 0;
            if ($util.Long) {
                var long = new $util.Long(0, 0, true);
                object.updatedAt = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
            } else
                object.updatedAt = options.longs === String ? "0" : 0;
            object.placement = false;
            object.headerUrl = "";
        }
        if (message.objectId != null && message.hasOwnProperty("objectId"))
            object.objectId = message.objectId;
        if (message.username != null && message.hasOwnProperty("username"))
            object.username = message.username;
        if (message.mobilePhoneNumberVerified != null && message.hasOwnProperty("mobilePhoneNumberVerified"))
            object.mobilePhoneNumberVerified = message.mobilePhoneNumberVerified;
        if (message.mobilePhoneNumber != null && message.hasOwnProperty("mobilePhoneNumber"))
            object.mobilePhoneNumber = message.mobilePhoneNumber;
        if (message.totalInning != null && message.hasOwnProperty("totalInning"))
            object.totalInning = message.totalInning;
        if (message.winInning != null && message.hasOwnProperty("winInning"))
            object.winInning = message.winInning;
        if (message.diamond != null && message.hasOwnProperty("diamond"))
            object.diamond = message.diamond;
        if (message.coin != null && message.hasOwnProperty("coin"))
            object.coin = message.coin;
        if (message.deviceId != null && message.hasOwnProperty("deviceId"))
            object.deviceId = message.deviceId;
        if (message.id != null && message.hasOwnProperty("id"))
            object.id = message.id;
        if (message.authData != null && message.hasOwnProperty("authData"))
            object.authData = message.authData;
        if (message.createdAt != null && message.hasOwnProperty("createdAt"))
            if (typeof message.createdAt === "number")
                object.createdAt = options.longs === String ? String(message.createdAt) : message.createdAt;
            else
                object.createdAt = options.longs === String ? $util.Long.prototype.toString.call(message.createdAt) : options.longs === Number ? new $util.LongBits(message.createdAt.low >>> 0, message.createdAt.high >>> 0).toNumber(true) : message.createdAt;
        if (message.updatedAt != null && message.hasOwnProperty("updatedAt"))
            if (typeof message.updatedAt === "number")
                object.updatedAt = options.longs === String ? String(message.updatedAt) : message.updatedAt;
            else
                object.updatedAt = options.longs === String ? $util.Long.prototype.toString.call(message.updatedAt) : options.longs === Number ? new $util.LongBits(message.updatedAt.low >>> 0, message.updatedAt.high >>> 0).toNumber(true) : message.updatedAt;
        if (message.placement != null && message.hasOwnProperty("placement"))
            object.placement = message.placement;
        if (message.headerUrl != null && message.hasOwnProperty("headerUrl"))
            object.headerUrl = message.headerUrl;
        return object;
    };

    /**
     * Converts this User to JSON.
     * @function toJSON
     * @memberof User
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    User.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return User;
})();

$root.Seat = (function() {

    /**
     * Properties of a Seat.
     * @exports ISeat
     * @interface ISeat
     * @property {number} [seatID] Seat seatID
     * @property {number} [callCoin] Seat callCoin
     * @property {IUser} [user] Seat user
     * @property {boolean} [isPrepared] Seat isPrepared
     */

    /**
     * Constructs a new Seat.
     * @exports Seat
     * @classdesc Represents a Seat.
     * @constructor
     * @param {ISeat=} [properties] Properties to set
     */
    function Seat(properties) {
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * Seat seatID.
     * @member {number}seatID
     * @memberof Seat
     * @instance
     */
    Seat.prototype.seatID = 0;

    /**
     * Seat callCoin.
     * @member {number}callCoin
     * @memberof Seat
     * @instance
     */
    Seat.prototype.callCoin = 0;

    /**
     * Seat user.
     * @member {(IUser|null|undefined)}user
     * @memberof Seat
     * @instance
     */
    Seat.prototype.user = null;

    /**
     * Seat isPrepared.
     * @member {boolean}isPrepared
     * @memberof Seat
     * @instance
     */
    Seat.prototype.isPrepared = false;

    /**
     * Creates a new Seat instance using the specified properties.
     * @function create
     * @memberof Seat
     * @static
     * @param {ISeat=} [properties] Properties to set
     * @returns {Seat} Seat instance
     */
    Seat.create = function create(properties) {
        return new Seat(properties);
    };

    /**
     * Encodes the specified Seat message. Does not implicitly {@link Seat.verify|verify} messages.
     * @function encode
     * @memberof Seat
     * @static
     * @param {ISeat} message Seat message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Seat.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.seatID != null && message.hasOwnProperty("seatID"))
            writer.uint32(/* id 1, wireType 0 =*/8).int32(message.seatID);
        if (message.callCoin != null && message.hasOwnProperty("callCoin"))
            writer.uint32(/* id 2, wireType 0 =*/16).int32(message.callCoin);
        if (message.user != null && message.hasOwnProperty("user"))
            $root.User.encode(message.user, writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
        if (message.isPrepared != null && message.hasOwnProperty("isPrepared"))
            writer.uint32(/* id 4, wireType 0 =*/32).bool(message.isPrepared);
        return writer;
    };

    /**
     * Encodes the specified Seat message, length delimited. Does not implicitly {@link Seat.verify|verify} messages.
     * @function encodeDelimited
     * @memberof Seat
     * @static
     * @param {ISeat} message Seat message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Seat.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a Seat message from the specified reader or buffer.
     * @function decode
     * @memberof Seat
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {Seat} Seat
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Seat.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Seat();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.seatID = reader.int32();
                break;
            case 2:
                message.callCoin = reader.int32();
                break;
            case 3:
                message.user = $root.User.decode(reader, reader.uint32());
                break;
            case 4:
                message.isPrepared = reader.bool();
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a Seat message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof Seat
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {Seat} Seat
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Seat.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a Seat message.
     * @function verify
     * @memberof Seat
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    Seat.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.seatID != null && message.hasOwnProperty("seatID"))
            if (!$util.isInteger(message.seatID))
                return "seatID: integer expected";
        if (message.callCoin != null && message.hasOwnProperty("callCoin"))
            if (!$util.isInteger(message.callCoin))
                return "callCoin: integer expected";
        if (message.user != null && message.hasOwnProperty("user")) {
            var error = $root.User.verify(message.user);
            if (error)
                return "user." + error;
        }
        if (message.isPrepared != null && message.hasOwnProperty("isPrepared"))
            if (typeof message.isPrepared !== "boolean")
                return "isPrepared: boolean expected";
        return null;
    };

    /**
     * Creates a Seat message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof Seat
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {Seat} Seat
     */
    Seat.fromObject = function fromObject(object) {
        if (object instanceof $root.Seat)
            return object;
        var message = new $root.Seat();
        if (object.seatID != null)
            message.seatID = object.seatID | 0;
        if (object.callCoin != null)
            message.callCoin = object.callCoin | 0;
        if (object.user != null) {
            if (typeof object.user !== "object")
                throw TypeError(".Seat.user: object expected");
            message.user = $root.User.fromObject(object.user);
        }
        if (object.isPrepared != null)
            message.isPrepared = Boolean(object.isPrepared);
        return message;
    };

    /**
     * Creates a plain object from a Seat message. Also converts values to other types if specified.
     * @function toObject
     * @memberof Seat
     * @static
     * @param {Seat} message Seat
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    Seat.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.defaults) {
            object.seatID = 0;
            object.callCoin = 0;
            object.user = null;
            object.isPrepared = false;
        }
        if (message.seatID != null && message.hasOwnProperty("seatID"))
            object.seatID = message.seatID;
        if (message.callCoin != null && message.hasOwnProperty("callCoin"))
            object.callCoin = message.callCoin;
        if (message.user != null && message.hasOwnProperty("user"))
            object.user = $root.User.toObject(message.user, options);
        if (message.isPrepared != null && message.hasOwnProperty("isPrepared"))
            object.isPrepared = message.isPrepared;
        return object;
    };

    /**
     * Converts this Seat to JSON.
     * @function toJSON
     * @memberof Seat
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    Seat.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return Seat;
})();

$root.Table = (function() {

    /**
     * Properties of a Table.
     * @exports ITable
     * @interface ITable
     * @property {number} [tableID] Table tableID
     * @property {Array.<ISeat>} [seats] Table seats
     * @property {number} [minBet] Table minBet
     * @property {number} [maxBet] Table maxBet
     * @property {number} [round] Table round
     */

    /**
     * Constructs a new Table.
     * @exports Table
     * @classdesc Represents a Table.
     * @constructor
     * @param {ITable=} [properties] Properties to set
     */
    function Table(properties) {
        this.seats = [];
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * Table tableID.
     * @member {number}tableID
     * @memberof Table
     * @instance
     */
    Table.prototype.tableID = 0;

    /**
     * Table seats.
     * @member {Array.<ISeat>}seats
     * @memberof Table
     * @instance
     */
    Table.prototype.seats = $util.emptyArray;

    /**
     * Table minBet.
     * @member {number}minBet
     * @memberof Table
     * @instance
     */
    Table.prototype.minBet = 0;

    /**
     * Table maxBet.
     * @member {number}maxBet
     * @memberof Table
     * @instance
     */
    Table.prototype.maxBet = 0;

    /**
     * Table round.
     * @member {number}round
     * @memberof Table
     * @instance
     */
    Table.prototype.round = 0;

    /**
     * Creates a new Table instance using the specified properties.
     * @function create
     * @memberof Table
     * @static
     * @param {ITable=} [properties] Properties to set
     * @returns {Table} Table instance
     */
    Table.create = function create(properties) {
        return new Table(properties);
    };

    /**
     * Encodes the specified Table message. Does not implicitly {@link Table.verify|verify} messages.
     * @function encode
     * @memberof Table
     * @static
     * @param {ITable} message Table message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Table.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.tableID != null && message.hasOwnProperty("tableID"))
            writer.uint32(/* id 1, wireType 0 =*/8).int32(message.tableID);
        if (message.seats != null && message.seats.length)
            for (var i = 0; i < message.seats.length; ++i)
                $root.Seat.encode(message.seats[i], writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
        if (message.minBet != null && message.hasOwnProperty("minBet"))
            writer.uint32(/* id 3, wireType 0 =*/24).int32(message.minBet);
        if (message.maxBet != null && message.hasOwnProperty("maxBet"))
            writer.uint32(/* id 4, wireType 0 =*/32).int32(message.maxBet);
        if (message.round != null && message.hasOwnProperty("round"))
            writer.uint32(/* id 5, wireType 0 =*/40).int32(message.round);
        return writer;
    };

    /**
     * Encodes the specified Table message, length delimited. Does not implicitly {@link Table.verify|verify} messages.
     * @function encodeDelimited
     * @memberof Table
     * @static
     * @param {ITable} message Table message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Table.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a Table message from the specified reader or buffer.
     * @function decode
     * @memberof Table
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {Table} Table
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Table.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Table();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.tableID = reader.int32();
                break;
            case 2:
                if (!(message.seats && message.seats.length))
                    message.seats = [];
                message.seats.push($root.Seat.decode(reader, reader.uint32()));
                break;
            case 3:
                message.minBet = reader.int32();
                break;
            case 4:
                message.maxBet = reader.int32();
                break;
            case 5:
                message.round = reader.int32();
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a Table message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof Table
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {Table} Table
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Table.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a Table message.
     * @function verify
     * @memberof Table
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    Table.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.tableID != null && message.hasOwnProperty("tableID"))
            if (!$util.isInteger(message.tableID))
                return "tableID: integer expected";
        if (message.seats != null && message.hasOwnProperty("seats")) {
            if (!Array.isArray(message.seats))
                return "seats: array expected";
            for (var i = 0; i < message.seats.length; ++i) {
                var error = $root.Seat.verify(message.seats[i]);
                if (error)
                    return "seats." + error;
            }
        }
        if (message.minBet != null && message.hasOwnProperty("minBet"))
            if (!$util.isInteger(message.minBet))
                return "minBet: integer expected";
        if (message.maxBet != null && message.hasOwnProperty("maxBet"))
            if (!$util.isInteger(message.maxBet))
                return "maxBet: integer expected";
        if (message.round != null && message.hasOwnProperty("round"))
            if (!$util.isInteger(message.round))
                return "round: integer expected";
        return null;
    };

    /**
     * Creates a Table message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof Table
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {Table} Table
     */
    Table.fromObject = function fromObject(object) {
        if (object instanceof $root.Table)
            return object;
        var message = new $root.Table();
        if (object.tableID != null)
            message.tableID = object.tableID | 0;
        if (object.seats) {
            if (!Array.isArray(object.seats))
                throw TypeError(".Table.seats: array expected");
            message.seats = [];
            for (var i = 0; i < object.seats.length; ++i) {
                if (typeof object.seats[i] !== "object")
                    throw TypeError(".Table.seats: object expected");
                message.seats[i] = $root.Seat.fromObject(object.seats[i]);
            }
        }
        if (object.minBet != null)
            message.minBet = object.minBet | 0;
        if (object.maxBet != null)
            message.maxBet = object.maxBet | 0;
        if (object.round != null)
            message.round = object.round | 0;
        return message;
    };

    /**
     * Creates a plain object from a Table message. Also converts values to other types if specified.
     * @function toObject
     * @memberof Table
     * @static
     * @param {Table} message Table
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    Table.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.arrays || options.defaults)
            object.seats = [];
        if (options.defaults) {
            object.tableID = 0;
            object.minBet = 0;
            object.maxBet = 0;
            object.round = 0;
        }
        if (message.tableID != null && message.hasOwnProperty("tableID"))
            object.tableID = message.tableID;
        if (message.seats && message.seats.length) {
            object.seats = [];
            for (var j = 0; j < message.seats.length; ++j)
                object.seats[j] = $root.Seat.toObject(message.seats[j], options);
        }
        if (message.minBet != null && message.hasOwnProperty("minBet"))
            object.minBet = message.minBet;
        if (message.maxBet != null && message.hasOwnProperty("maxBet"))
            object.maxBet = message.maxBet;
        if (message.round != null && message.hasOwnProperty("round"))
            object.round = message.round;
        return object;
    };

    /**
     * Converts this Table to JSON.
     * @function toJSON
     * @memberof Table
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    Table.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return Table;
})();

/**
 * GameAction enum.
 * @exports GameAction
 * @enum {string}
 * @property {number} PREPARE=0 PREPARE value
 * @property {number} ADDBET=1 ADDBET value
 * @property {number} FOLLOW=2 FOLLOW value
 * @property {number} GIVEUP=3 GIVEUP value
 * @property {number} COMPARE=4 COMPARE value
 * @property {number} WATCH=5 WATCH value
 * @property {number} COUNTDOWN_START=6 COUNTDOWN_START value
 * @property {number} SEND_CARD=7 SEND_CARD value
 * @property {number} TURN=8 TURN value
 * @property {number} END=9 END value
 */
$root.GameAction = (function() {
    var valuesById = {}, values = Object.create(valuesById);
    values[valuesById[0] = "PREPARE"] = 0;
    values[valuesById[1] = "ADDBET"] = 1;
    values[valuesById[2] = "FOLLOW"] = 2;
    values[valuesById[3] = "GIVEUP"] = 3;
    values[valuesById[4] = "COMPARE"] = 4;
    values[valuesById[5] = "WATCH"] = 5;
    values[valuesById[6] = "COUNTDOWN_START"] = 6;
    values[valuesById[7] = "SEND_CARD"] = 7;
    values[valuesById[8] = "TURN"] = 8;
    values[valuesById[9] = "END"] = 9;
    return values;
})();

$root.GameOperate = (function() {

    /**
     * Properties of a GameOperate.
     * @exports IGameOperate
     * @interface IGameOperate
     * @property {GameAction} [action] GameOperate action
     * @property {number} [seatID] GameOperate seatID
     * @property {number} [placementSeatID] GameOperate placementSeatID
     * @property {number} [coin] GameOperate coin
     * @property {Array.<Uint8Array>} [cards] GameOperate cards
     * @property {number|Long} [millis] GameOperate millis
     */

    /**
     * Constructs a new GameOperate.
     * @exports GameOperate
     * @classdesc Represents a GameOperate.
     * @constructor
     * @param {IGameOperate=} [properties] Properties to set
     */
    function GameOperate(properties) {
        this.cards = [];
        if (properties)
            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]];
    }

    /**
     * GameOperate action.
     * @member {GameAction}action
     * @memberof GameOperate
     * @instance
     */
    GameOperate.prototype.action = 0;

    /**
     * GameOperate seatID.
     * @member {number}seatID
     * @memberof GameOperate
     * @instance
     */
    GameOperate.prototype.seatID = 0;

    /**
     * GameOperate placementSeatID.
     * @member {number}placementSeatID
     * @memberof GameOperate
     * @instance
     */
    GameOperate.prototype.placementSeatID = 0;

    /**
     * GameOperate coin.
     * @member {number}coin
     * @memberof GameOperate
     * @instance
     */
    GameOperate.prototype.coin = 0;

    /**
     * GameOperate cards.
     * @member {Array.<Uint8Array>}cards
     * @memberof GameOperate
     * @instance
     */
    GameOperate.prototype.cards = $util.emptyArray;

    /**
     * GameOperate millis.
     * @member {number|Long}millis
     * @memberof GameOperate
     * @instance
     */
    GameOperate.prototype.millis = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

    /**
     * Creates a new GameOperate instance using the specified properties.
     * @function create
     * @memberof GameOperate
     * @static
     * @param {IGameOperate=} [properties] Properties to set
     * @returns {GameOperate} GameOperate instance
     */
    GameOperate.create = function create(properties) {
        return new GameOperate(properties);
    };

    /**
     * Encodes the specified GameOperate message. Does not implicitly {@link GameOperate.verify|verify} messages.
     * @function encode
     * @memberof GameOperate
     * @static
     * @param {IGameOperate} message GameOperate message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    GameOperate.encode = function encode(message, writer) {
        if (!writer)
            writer = $Writer.create();
        if (message.action != null && message.hasOwnProperty("action"))
            writer.uint32(/* id 1, wireType 0 =*/8).int32(message.action);
        if (message.seatID != null && message.hasOwnProperty("seatID"))
            writer.uint32(/* id 2, wireType 0 =*/16).int32(message.seatID);
        if (message.placementSeatID != null && message.hasOwnProperty("placementSeatID"))
            writer.uint32(/* id 3, wireType 0 =*/24).int32(message.placementSeatID);
        if (message.coin != null && message.hasOwnProperty("coin"))
            writer.uint32(/* id 4, wireType 0 =*/32).int32(message.coin);
        if (message.cards != null && message.cards.length)
            for (var i = 0; i < message.cards.length; ++i)
                writer.uint32(/* id 5, wireType 2 =*/42).bytes(message.cards[i]);
        if (message.millis != null && message.hasOwnProperty("millis"))
            writer.uint32(/* id 6, wireType 0 =*/48).uint64(message.millis);
        return writer;
    };

    /**
     * Encodes the specified GameOperate message, length delimited. Does not implicitly {@link GameOperate.verify|verify} messages.
     * @function encodeDelimited
     * @memberof GameOperate
     * @static
     * @param {IGameOperate} message GameOperate message or plain object to encode
     * @param {$protobuf.Writer} [writer] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    GameOperate.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer).ldelim();
    };

    /**
     * Decodes a GameOperate message from the specified reader or buffer.
     * @function decode
     * @memberof GameOperate
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @param {number} [length] Message length if known beforehand
     * @returns {GameOperate} GameOperate
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    GameOperate.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader))
            reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.GameOperate();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
            case 1:
                message.action = reader.int32();
                break;
            case 2:
                message.seatID = reader.int32();
                break;
            case 3:
                message.placementSeatID = reader.int32();
                break;
            case 4:
                message.coin = reader.int32();
                break;
            case 5:
                if (!(message.cards && message.cards.length))
                    message.cards = [];
                message.cards.push(reader.bytes());
                break;
            case 6:
                message.millis = reader.uint64();
                break;
            default:
                reader.skipType(tag & 7);
                break;
            }
        }
        return message;
    };

    /**
     * Decodes a GameOperate message from the specified reader or buffer, length delimited.
     * @function decodeDelimited
     * @memberof GameOperate
     * @static
     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
     * @returns {GameOperate} GameOperate
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    GameOperate.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader))
            reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
    };

    /**
     * Verifies a GameOperate message.
     * @function verify
     * @memberof GameOperate
     * @static
     * @param {Object.<string,*>} message Plain object to verify
     * @returns {string|null} `null` if valid, otherwise the reason why it is not
     */
    GameOperate.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
            return "object expected";
        if (message.action != null && message.hasOwnProperty("action"))
            switch (message.action) {
            default:
                return "action: enum value expected";
            case 0:
            case 1:
            case 2:
            case 3:
            case 4:
            case 5:
            case 6:
            case 7:
            case 8:
            case 9:
                break;
            }
        if (message.seatID != null && message.hasOwnProperty("seatID"))
            if (!$util.isInteger(message.seatID))
                return "seatID: integer expected";
        if (message.placementSeatID != null && message.hasOwnProperty("placementSeatID"))
            if (!$util.isInteger(message.placementSeatID))
                return "placementSeatID: integer expected";
        if (message.coin != null && message.hasOwnProperty("coin"))
            if (!$util.isInteger(message.coin))
                return "coin: integer expected";
        if (message.cards != null && message.hasOwnProperty("cards")) {
            if (!Array.isArray(message.cards))
                return "cards: array expected";
            for (var i = 0; i < message.cards.length; ++i)
                if (!(message.cards[i] && typeof message.cards[i].length === "number" || $util.isString(message.cards[i])))
                    return "cards: buffer[] expected";
        }
        if (message.millis != null && message.hasOwnProperty("millis"))
            if (!$util.isInteger(message.millis) && !(message.millis && $util.isInteger(message.millis.low) && $util.isInteger(message.millis.high)))
                return "millis: integer|Long expected";
        return null;
    };

    /**
     * Creates a GameOperate message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof GameOperate
     * @static
     * @param {Object.<string,*>} object Plain object
     * @returns {GameOperate} GameOperate
     */
    GameOperate.fromObject = function fromObject(object) {
        if (object instanceof $root.GameOperate)
            return object;
        var message = new $root.GameOperate();
        switch (object.action) {
        case "PREPARE":
        case 0:
            message.action = 0;
            break;
        case "ADDBET":
        case 1:
            message.action = 1;
            break;
        case "FOLLOW":
        case 2:
            message.action = 2;
            break;
        case "GIVEUP":
        case 3:
            message.action = 3;
            break;
        case "COMPARE":
        case 4:
            message.action = 4;
            break;
        case "WATCH":
        case 5:
            message.action = 5;
            break;
        case "COUNTDOWN_START":
        case 6:
            message.action = 6;
            break;
        case "SEND_CARD":
        case 7:
            message.action = 7;
            break;
        case "TURN":
        case 8:
            message.action = 8;
            break;
        case "END":
        case 9:
            message.action = 9;
            break;
        }
        if (object.seatID != null)
            message.seatID = object.seatID | 0;
        if (object.placementSeatID != null)
            message.placementSeatID = object.placementSeatID | 0;
        if (object.coin != null)
            message.coin = object.coin | 0;
        if (object.cards) {
            if (!Array.isArray(object.cards))
                throw TypeError(".GameOperate.cards: array expected");
            message.cards = [];
            for (var i = 0; i < object.cards.length; ++i)
                if (typeof object.cards[i] === "string")
                    $util.base64.decode(object.cards[i], message.cards[i] = $util.newBuffer($util.base64.length(object.cards[i])), 0);
                else if (object.cards[i].length)
                    message.cards[i] = object.cards[i];
        }
        if (object.millis != null)
            if ($util.Long)
                (message.millis = $util.Long.fromValue(object.millis)).unsigned = true;
            else if (typeof object.millis === "string")
                message.millis = parseInt(object.millis, 10);
            else if (typeof object.millis === "number")
                message.millis = object.millis;
            else if (typeof object.millis === "object")
                message.millis = new $util.LongBits(object.millis.low >>> 0, object.millis.high >>> 0).toNumber(true);
        return message;
    };

    /**
     * Creates a plain object from a GameOperate message. Also converts values to other types if specified.
     * @function toObject
     * @memberof GameOperate
     * @static
     * @param {GameOperate} message GameOperate
     * @param {$protobuf.IConversionOptions} [options] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    GameOperate.toObject = function toObject(message, options) {
        if (!options)
            options = {};
        var object = {};
        if (options.arrays || options.defaults)
            object.cards = [];
        if (options.defaults) {
            object.action = options.enums === String ? "PREPARE" : 0;
            object.seatID = 0;
            object.placementSeatID = 0;
            object.coin = 0;
            if ($util.Long) {
                var long = new $util.Long(0, 0, true);
                object.millis = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
            } else
                object.millis = options.longs === String ? "0" : 0;
        }
        if (message.action != null && message.hasOwnProperty("action"))
            object.action = options.enums === String ? $root.GameAction[message.action] : message.action;
        if (message.seatID != null && message.hasOwnProperty("seatID"))
            object.seatID = message.seatID;
        if (message.placementSeatID != null && message.hasOwnProperty("placementSeatID"))
            object.placementSeatID = message.placementSeatID;
        if (message.coin != null && message.hasOwnProperty("coin"))
            object.coin = message.coin;
        if (message.cards && message.cards.length) {
            object.cards = [];
            for (var j = 0; j < message.cards.length; ++j)
                object.cards[j] = options.bytes === String ? $util.base64.encode(message.cards[j], 0, message.cards[j].length) : options.bytes === Array ? Array.prototype.slice.call(message.cards[j]) : message.cards[j];
        }
        if (message.millis != null && message.hasOwnProperty("millis"))
            if (typeof message.millis === "number")
                object.millis = options.longs === String ? String(message.millis) : message.millis;
            else
                object.millis = options.longs === String ? $util.Long.prototype.toString.call(message.millis) : options.longs === Number ? new $util.LongBits(message.millis.low >>> 0, message.millis.high >>> 0).toNumber(true) : message.millis;
        return object;
    };

    /**
     * Converts this GameOperate to JSON.
     * @function toJSON
     * @memberof GameOperate
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    GameOperate.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return GameOperate;
})();

// module.exports = $root;
