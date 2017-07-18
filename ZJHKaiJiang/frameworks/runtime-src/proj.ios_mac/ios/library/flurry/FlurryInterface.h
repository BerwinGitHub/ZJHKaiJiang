//
//  FlurryInterface.h
//  HotFixer
//
//  Created by 唐博文 on 2017/6/5.
//
//

#import <Foundation/Foundation.h>

@interface FlurryInterface : NSObject

+ (void)logEvent:(NSString*)data;// 这个里面包含了四个方法

+ (void)logEventWithParams:(NSString*)data;

+ (void)logEventWithTimed:(NSString*)data;

+ (void)logEventWithParmsAndTimes:(NSString*)data;

+ (void)endEvent:(NSString*)data;

@end
