//
//  ILibraryAccess.h
//  slotsgame
//
//  Created by admin on 17/5/2.
//
//

#import <Foundation/Foundation.h>
#import "Utility.h"

@interface ILibraryAccess : NSObject

#pragma mark -变量
/**
 * 当前是否是debug模式
 */
@property(nonatomic, readwrite)BOOL debug;

/**
 * 是否是调试模式
 */
@property(nonatomic, strong)UIViewController *viewController;

#pragma mark -方法
// 默认是必须实现的方法
- (BOOL)setUpEnvironment:(UIViewController*)viewController withDebug:(BOOL)debug;


@end
