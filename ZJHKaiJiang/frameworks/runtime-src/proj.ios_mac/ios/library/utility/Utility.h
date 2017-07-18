//
//  Utility.h
//  slotsgame
//
//  Created by admin on 2017/5/5.
//
//

#import <Foundation/Foundation.h>

#define IS_IPAD             (UI_USER_INTERFACE_IDIOM() == UIUserInterfaceIdiomPad)      // 当前设备是否是iPad
#define IS_IPHONE           (UI_USER_INTERFACE_IDIOM() == UIUserInterfaceIdiomPhone)    // 当前设备是否是iPhone
#define Number(i)           [NSNumber numberWithInt:(int)i]
#define UIColor(r,g,b,a)    [UIColor colorWithRed:r / 255.0 green:g / 255.0 blue:b / 255.0 alpha:a / 255.0]

@interface Utility : NSObject

/**
 * JSON 转成 Dictionary
 *
 * @param json json字符串
 * @return NSDictionary 字典
 */
+ (NSDictionary *)dictionaryWithJSONString:(NSString *)json;

/**
 * JSON 转成 Array
 *
 * @param json json字符串
 * @return NSDictionary 字典
 */
+ (NSArray *)arrayWithJSONString:(NSString *)jsonString;

/**
 * Dictionary 转成 String
 *
 * @param json json字符串
 * @return NSDictionary 字典
 */
+ (NSString*)dictionaryToJSONString:(id)infoDict;

/**
 * Array 转成 String
 *
 * @param json json字符串
 * @return NSDictionary 字典
 */
+ (NSString*)arrayToJSONString:(id)infoArr;

/**
 * 得到改应用在AppStore的连接，区分7.0已上/下系统, https://
 *
 * @param appleId
 * @return NSString url string
 */
+ (NSString*)getApplicationOnAppStoreHttpsLink:(NSString*)appleId;

/**
 * 得到改应用在AppStore的连接，区分7.0已上/下系统, items-apps://
 *
 * @param appleId
 * @return NSString url string
 */
+ (NSString*)getApplicationOnAppStoreiTunesLink:(NSString*)appleId;

+ (CGSize)screenSize;

+ (CGRect)screenRect;

+ (UIColor*)colorWithR:(float)r G:(float)g B:(float)b A:(float)a;

+ (NSString*)getApplicationVersion;

+ (NSString*)getApplicationBuild;

/**
 * 调用eval发送事件
 */
+ (void)emitJavaScriptEvent:(NSString*)eventName data:(NSDictionary*)data;

/**
 * 调用JS回调的代码
 */
+ (void)nativeCallbackToJs:(NSString*)callback withData:(NSDictionary*)jsonData;

/**
 * 执行JavaScript代码
 */
+ (void)evalJaveScript:(NSString*)js;

@end
