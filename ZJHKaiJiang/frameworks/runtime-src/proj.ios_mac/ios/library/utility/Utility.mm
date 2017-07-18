//
//  Utility.m
//  slotsgame
//
//  Created by admin on 2017/5/5.
//
//

#import "Utility.h"
#include "scripting/js-bindings/manual/ScriptingCore.h"

@implementation Utility

+ (NSDictionary *)dictionaryWithJSONString:(NSString *)json
{
    if (!json || [json isEqualToString:@""]) {
        return nil;
    }
    NSData *jsonData = [json dataUsingEncoding:NSUTF8StringEncoding];
    NSError *err = nil;
    NSDictionary *dic = [NSJSONSerialization JSONObjectWithData:jsonData
                                                        options:NSJSONReadingMutableContainers
                                                          error:&err];
    if(err) {
        NSLog(@"json解析失败：%@, json:%@", err, json);
        return nil;
    }
    return dic;
}

+ (NSArray *)arrayWithJSONString:(NSString *)json
{
    if (!json || [json isEqualToString:@""]) {
        return nil;
    }
    
    NSData *jsonData = [json dataUsingEncoding:NSUTF8StringEncoding];
    NSError *err = nil;
    NSArray *arr = [NSJSONSerialization JSONObjectWithData:jsonData
                                                   options:NSJSONReadingMutableContainers
                                                     error:&err];
    if(err) {
        NSLog(@"json解析失败：%@, json:%@", err, json);
        return nil;
    }
    return arr;
}

+ (NSString*)dictionaryToJSONString:(id)infoDict
{
    NSError *error = nil;
    // NSJSONWritingPrettyPrinted kNilOptions 可读性的参数
    NSData *jsonData = [NSJSONSerialization dataWithJSONObject:infoDict
                                                       options:kNilOptions // Pass 0 if you don't care about the readability of the generated string
                                                         error:&error];
    NSString *jsonString = @"";
    if (! jsonData) {
        NSLog(@"Got an error: %@", error);
    }else {
        jsonString = [[NSString alloc] initWithData:jsonData encoding:NSUTF8StringEncoding];
    }
    
    jsonString = [jsonString stringByTrimmingCharactersInSet:[NSCharacterSet whitespaceAndNewlineCharacterSet]];  //去除掉首尾的空白字符和换行字符
    [jsonString stringByReplacingOccurrencesOfString:@"\n" withString:@""];
    return jsonString;
}

+ (NSString*)arrayToJSONString:(id)infoArr
{
    NSError *error = nil;
    NSData *jsonData = [NSJSONSerialization dataWithJSONObject:infoArr
                                                       options:kNilOptions // Pass 0 if you don't care about the readability of the generated string
                                                         error:&error];
    NSString *jsonString = @"";
    
    if (! jsonData) {
        NSLog(@"Got an error: %@", error);
    }else {
        jsonString = [[NSString alloc] initWithData:jsonData encoding:NSUTF8StringEncoding];
    }
    
    jsonString = [jsonString stringByTrimmingCharactersInSet:[NSCharacterSet whitespaceAndNewlineCharacterSet]];  //去除掉首尾的空白字符和换行字符
    [jsonString stringByReplacingOccurrencesOfString:@"\n" withString:@""];
    return jsonString;
}

+ (NSString*)getApplicationOnAppStoreHttpsLink:(NSString*)appleId;
{
    NSString *url=nil;
    if ([[UIDevice currentDevice].systemVersion floatValue] < 7.0) {
        url=[NSString stringWithFormat:@"https://ax.itunes.apple.com/WebObjects/MZStore.woa/wa/viewContentsUserReviews?type=Purple+Software&id=%@", appleId];
    }else{
        url=[NSString stringWithFormat:@"https://itunes.apple.com/app/id%@", appleId];
    }
    return url;
}

+ (NSString*)getApplicationOnAppStoreiTunesLink:(NSString*)appleId;
{
    NSString *url=nil;
    if ([[UIDevice currentDevice].systemVersion floatValue] < 7.0) {
        url=[NSString stringWithFormat:@"items-apps://ax.itunes.apple.com/WebObjects/MZStore.woa/wa/viewContentsUserReviews?type=Purple+Software&id=%@", appleId];
    }else{
        url=[NSString stringWithFormat:@"items-apps://itunes.apple.com/app/id%@", appleId];
    }
    return url;
}

+ (CGSize)screenSize
{
    return [[UIScreen mainScreen] bounds].size;
}

+ (CGRect)screenRect;
{
    CGSize s = [Utility screenSize];
    return CGRectMake(0, 0, s.width, s.height);
}

+ (UIColor*)colorWithR:(float)r G:(float)g B:(float)b A:(float)a
{
    return [UIColor colorWithRed:r / 255.0 green:g / 255.0 blue:b / 255.0 alpha:a / 255.0];
}

+ (NSString*)getApplicationVersion
{
    return [[[NSBundle mainBundle] infoDictionary] objectForKey:@"CFBundleShortVersionString"];
//    return [[NSBundle mainBundle] objectForInfoDictionaryKey:@"CFBundleShortVersionString"];
}

+ (NSString*)getApplicationBuild
{
    return [[[NSBundle mainBundle] infoDictionary] objectForKey:@"CFBundleVersion"];
}

+ (void)emitJavaScriptEvent:(NSString*)eventName data:(NSDictionary*)data
{
    NSString *dataStr = [Utility dictionaryToJSONString:data];
    NSString *js = [NSString stringWithFormat:@"cc.app.events.emit(\"%@\", %@)", eventName, dataStr];
    [Utility evalJaveScript:js];
}

+ (void)nativeCallbackToJs:(NSString*)callback withData:(NSDictionary*)data;
{
    NSString *dataStr = [Utility dictionaryToJSONString:data];
    NSString *js = [NSString stringWithFormat:@"cc.nativeCallback(%@, %@)", callback, dataStr];
    [Utility evalJaveScript:js];
}

+ (void)evalJaveScript:(NSString*)js
{
    std::string eval = [js UTF8String];
    ScriptingCore::getInstance()->evalString(eval.c_str());
}

@end
