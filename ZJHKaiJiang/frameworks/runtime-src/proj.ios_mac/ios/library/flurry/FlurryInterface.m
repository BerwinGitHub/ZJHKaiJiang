//
//  FlurryInterface.m
//  HotFixer
//
//  Created by 唐博文 on 2017/6/5.
//
//

#import "FlurryInterface.h"
#include "FlurryManager.h"
#import "Utility.h"

@implementation FlurryInterface

+ (void)logEvent:(NSString*)data
{
    NSDictionary *dict = [Utility dictionaryWithJSONString:data];
    NSString *name = [dict objectForKey:@"name"];
    [[FlurryManager getInstance] logEvent:name];
}


+ (void)logEventWithParams:(NSString*)data
{
    NSDictionary *dict = [Utility dictionaryWithJSONString:data];
    NSString *name = [dict objectForKey:@"name"];
    NSDictionary *params = [dict objectForKey:@"params"];
    [[FlurryManager getInstance] logEvent:name withParameters:params];
}

+ (void)logEventWithTimed:(NSString*)data
{
    NSDictionary *dict = [Utility dictionaryWithJSONString:data];
    NSString *name = [dict objectForKey:@"name"];
    BOOL timed = [[dict objectForKey:@"timed"] boolValue];
    [[FlurryManager getInstance] logEvent:name timed:timed];
}

+ (void)logEventWithParmsAndTimes:(NSString*)data
{
    NSDictionary *dict = [Utility dictionaryWithJSONString:data];
    NSString *name = [dict objectForKey:@"name"];
    NSDictionary *params = [dict objectForKey:@"params"];
    BOOL timed = [[dict objectForKey:@"timed"] boolValue];
    [[FlurryManager getInstance] logEvent:name withParameters:params timed:timed];
}

+ (void)endEvent:(NSString*)data
{
    NSDictionary *dict = [Utility dictionaryWithJSONString:data];
    NSString *name = [dict objectForKey:@"name"];
    NSDictionary *params = [dict objectForKey:@"params"];
    [[FlurryManager getInstance] endEvent:name withParameters:params];
}

@end
