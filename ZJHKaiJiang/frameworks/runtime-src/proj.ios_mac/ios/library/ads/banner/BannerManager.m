//
//  BannerManager.m
//  slotsgame
//
//  Created by admin on 2017/5/10.
//
//

#import "BannerManager.h"
#import "BannerAdmob.h"

@implementation BannerManager

static BannerManager *_instance = nil;

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
    IBannerAccess *adomb = [[BannerAdmob alloc] init];
    [adomb setUpEnvironment:viewController withDebug:debug];
    [self.adArray addObject:adomb];
    [self sortAdWithAgentQueue:queue];
    return YES;
}

- (int)getGravity
{
    for (IBannerAccess *banner in self.adArray) {
        return [banner gravity];
    }
    return kGravityBottom;
}

- (void)setGravity:(int)gravity
{
    for (IBannerAccess *banner in self.adArray) {
        [banner setGravity:gravity];
    }
}

@end
