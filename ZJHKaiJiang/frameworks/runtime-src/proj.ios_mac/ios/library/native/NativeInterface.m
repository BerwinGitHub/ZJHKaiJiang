//
//  NativeInterface.m
//  HotFixer
//
//  Created by 唐博文 on 2017/5/30.
//
//

#import "NativeInterface.h"
#import "NativeManager.h"
#import "Utility.h"

@implementation NativeInterface


+ (void)showPrivacyWithURL:(NSString*)jsonData
{
    NSDictionary *dict = [Utility dictionaryWithJSONString:jsonData];
    NSString *url = [dict objectForKey:@"url"];
    [[NativeManager getInstance] showInAppWeb:url];
}

+ (void)showAlertDialog:(NSString*)jsonData
{
    NSDictionary *dict = [Utility dictionaryWithJSONString:jsonData];
    NSString *title = [dict objectForKey:@"title"];
    NSString *content = [dict objectForKey:@"content"];
    NSString *positive = [dict objectForKey:@"positive"];
    NSString *negative = [dict objectForKey:@"negative"];
    NSString *callback = [dict objectForKey:@"callback"];
    [[NativeManager getInstance] showAlertDialog:title withContent:content positiveName:positive negativeName:negative listener:^(NSInteger buttonIndex) {
        [Utility nativeCallbackToJs:callback withData:@{@"buttonIndex": Number(buttonIndex)}];
    }];
}

+ (void)systemShare:(NSString*)jsonData
{
    NSDictionary *dict = [Utility dictionaryWithJSONString:jsonData];
    NSString *title = [dict objectForKey:@"title"];
    NSString *content = [dict objectForKey:@"content"];
    NSString *imgUrl = [dict objectForKey:@"imgUrl"];
    [[NativeManager getInstance] systemShareWithTitile:title content:content imageUrl:imgUrl];
}

+ (void)makeToast:(NSString*)jsonData
{
    NSDictionary *dict = [Utility dictionaryWithJSONString:jsonData];
    NSString *content = [dict objectForKey:@"content"];
    long time = [[dict objectForKey:@"time"] longValue];
    [[NativeManager getInstance] makeToast:content withTime:time];
    
}

@end
