//
//  InterstitialManager.m
//  slotsgame
//
//  Created by admin on 2017/5/11.
//
//

#import "InterstitialManager.h"
#import "IInterstitialAccess.h"
#import "InterstitialAdmob.h"

@implementation InterstitialManager

static InterstitialManager *_instance = nil;

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

- (BOOL)setUpEnvironment:(UIViewController*)viewController withQueue:(NSArray*)queue andDebug:(BOOL)debug
{
    [super setUpEnvironment:viewController withQueue:queue andDebug:debug];
    IInterstitialAccess *adomb = [[InterstitialAdmob alloc] init];
    [adomb setUpEnvironment:viewController withDebug:debug];
    [self.adArray addObject:adomb];
    [self sortAdWithAgentQueue:queue];
    return YES;
}

@end
