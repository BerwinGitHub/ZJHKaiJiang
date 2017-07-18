//
//  FlurryManager.m
//  slotsgame
//
//  Created by admin on 2017/5/6.
//
//

#import "FlurryManager.h"
#import "Flurry.h"
#import "ConfigManager.h"

@implementation FlurryManager

static FlurryManager *_instance = nil;

+ (instancetype)getInstance
{
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        _instance = [[self alloc] init];
    });
    
    return _instance;
}

+ (void)pure
{
    if(_instance){
        [_instance release];
        _instance = nil;
    }
}

#pragma mark - override
- (BOOL)setUpEnvironment:(UIViewController*)viewController withDebug:(BOOL)debug
{
    [super setUpEnvironment:viewController withDebug:debug];
    NSString *API_KEY = [[ConfigManager getInstance] getFlurryIdByKey:kConfigFlurryApiKey];
    // FlurryLogLevelNone
    FlurrySessionBuilder* builder = [[[[[FlurrySessionBuilder new]
                                        withLogLevel:FlurryLogLevelNone]
                                       withCrashReporting:YES]
                                      withSessionContinueSeconds:10]
                                     withAppVersion:@"1.0"];
    [Flurry startSession:API_KEY withSessionBuilder:builder];
    return YES;
}


- (void)application:(UIApplication*)application didFinishLaunchingWithOptions:(NSDictionary*)launchOptions
{
    NSString *version = [Utility getApplicationVersion];
    NSString *API_KEY = [[ConfigManager getInstance] getFlurryIdByKey:kConfigFlurryApiKey];
    // FlurryLogLevelNone
    FlurrySessionBuilder* builder = [[[[[FlurrySessionBuilder new]
                                        withLogLevel:FlurryLogLevelNone]
                                       withCrashReporting:YES]
                                      withSessionContinueSeconds:10]
                                     withAppVersion:version];
    [Flurry startSession:API_KEY withSessionBuilder:builder];
    
}

- (void)logEvent:(NSString*)name
{
    [Flurry logEvent:name];
}

- (void)logEvent:(NSString *)name timed:(BOOL)timed
{
    [Flurry logEvent:name timed:timed];
}

- (void)logEvent:(NSString*)name withParameters:(NSDictionary*)params
{
    [Flurry logEvent:name withParameters:params];
}

- (void)logEvent:(NSString*)name withParameters:(NSDictionary*)params timed:(BOOL)timed
{
    [Flurry logEvent:name withParameters:params timed:timed];
}

- (void)endEvent:(NSString*)event withParameters:(NSDictionary*)params
{
    [Flurry endTimedEvent:event withParameters:params];
}

@end
