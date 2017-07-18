//
//  IAdAccess.m
//  slotsgame
//
//  Created by admin on 2017/5/10.
//
//

#import "IManagerAccess.h"

@implementation IManagerAccess

- (BOOL)setUpEnvironment:(UIViewController*)viewController withQueue:(NSArray*)queue andDebug:(BOOL)debug
{
    self.adArray = [[NSMutableArray alloc] init];
    return YES;
}

- (void)preload
{
    self.loadIndex = 0;
    [self preloadWithSequence];
}

- (void)preloadWithSequence
{
    IAdAccess *ad = [self.adArray objectAtIndex:self.loadIndex];
    [ad preloadWithCallback:^(IAdAccess *ad, BOOL available) {
        if(!available){
            self.loadIndex++;
            if(self.loadIndex >= 0 && self.loadIndex < [self.adArray count]) { // 加载失败，进行下个广告的加载
                [self preloadWithSequence];
            }
        }
    }];
}

- (BOOL)show
{
    for (IAdAccess *ad in self.adArray) {
        if([ad available]){
            [ad show];
            return YES;
        }
    }
    return NO;
}

- (BOOL)isAvailable
{
    for (IAdAccess *ad in self.adArray) {
        if([ad available]){
            return YES;
        }
    }
    return NO;
}

- (BOOL)isShown
{
    for (IAdAccess *ad in self.adArray) {
        if([ad shown]){
            return YES;
        }
    }
    return NO;
}

- (void)hide
{
    for (IAdAccess *ad in self.adArray) {
        [ad hide];
    }
}

- (void)sortAdWithAgentQueue:(NSArray*)agentQueue
{
    NSArray *temp = [[NSArray alloc] initWithArray:self.adArray];
    [self.adArray removeAllObjects];
    for (NSNumber *agent in agentQueue) {
        for (IAdAccess *ad in temp) {
            if([agent intValue] == [ad adAgent]){
                [self.adArray addObject:ad];
            }
        }
    }
}

@end
