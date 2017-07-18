//
//  FacebookInterface.h
//  HotFixer
//
//  Created by 唐博文 on 2017/6/1.
//
//

#import <Foundation/Foundation.h>

@interface FacebookInterface : NSObject

+ (void)login:(NSString*)data;

+ (NSString*)isLogin:(NSString*)data;

+ (void)invite:(NSString*)data;

+ (void)share:(NSString*)data;

+ (NSString*)getAccessToken:(NSString*)data;

@end
