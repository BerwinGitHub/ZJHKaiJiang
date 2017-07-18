//
//  AdListener.h
//  slotsgame
//
//  Created by admin on 2017/5/10.
//
//

#import <Foundation/Foundation.h>

@protocol AdListener <NSObject>

// 回调的方法类型
typedef NS_ENUM(NSInteger, MethodType){
    kMethodTypeLoaded             = 0,    // 广告加载成功
    kMethodTypeFailedToLoad       = 1,    // 广告加载失败
    kMethodTypeLeftApplication    = 2,    // 离开应用
    kMethodTypeOpen               = 3,    // 广告被打开
    kMethodTypeClosed             = 4,    // 广告已经关闭
    kMethodTypeStarted            = 5,    // 广告开始(一般在视屏广告中，表示视屏点击开始)
    kMethodTypeRewarded           = 6,    // 获得视频广告的奖励
    kMethodTypeWillClose          = 7,    // 广告将要关闭 - for ios
    kMethodTypeFailedOpen         = 8     // 广告展示失败 - for ios
};

@required
/**
 * 广告的回调，所有的广告回调这里
 * @param adType        当前广告回调的是什么类型的广告
 * @param methodType    当前回调的广告是什么回调方法(参考：AdListener->MethodType)
 * @param amount        当是视屏广告看完有奖励的时候，该参数才会有具体的数值
 * @param err           广告回调是否是错误的
 */
- (void)adsCallback:(int)adType methodType:(int)methodType available:(BOOL)available amount:(int)amount err:(int)err;

@end
