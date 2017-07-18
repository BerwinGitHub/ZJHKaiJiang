//
//  IManagerAccess.h
//  slotsgame
//
//  Created by admin on 2017/5/11.
//
//

#include "IAdAccess.h"

@interface IManagerAccess : NSObject

#pragma mark -成员变量
/**
 * 在排序中的广告上代理集合
 */
@property(nonatomic, strong)NSMutableArray *adArray;
/**
 * 当前代理商加载的下标
 */
@property(nonatomic, assign)int loadIndex;

#pragma mark -方法
/**
 * 预加载广告项目
 * @param viewController  承载广告的页面
 * @param debug 是否是调试模式
 * @return BOOL 是否初始化成功
 */
- (BOOL)setUpEnvironment:(UIViewController*)viewController withQueue:(NSArray*)queue andDebug:(BOOL)debug;

/**
 * 预加载广告项目
 * @param type  需要加载的广告类型(参考：IAdAccess->AdType)
 */
- (void)preload;

/**
 * 预加载广告项目并回调
 * @param block  该广告加载成功/失败的回调，方便进行下个广告的加载
 */
//- (void)preloadWithCallback:(AvailableBlock) block;

/**
 * 显示广告项目
 * @param type  需要显示的广告类型(参考：IAdAccess->AdType)
 * #return BOOL 指定的广告类型是否显示成功
 */
- (BOOL)show;

/**
 * 隐藏广告项目
 * @param type  需要隐藏的广告类型(参考：IAdAccess->AdType)
 */
- (void)hide;

/**
 * 广告项目是否可用(可以用来在游戏中展示)
 * @param type  需要显示的广告类型(参考：IAdAccess->AdType)
 * #return BOOL 指定的广告类型是否可以展示
 */
- (BOOL)isAvailable;

/**
 * 广告项目是否已经是展示的状态
 * @param type  需要显示的广告类型(参考：IAdAccess->AdType)
 * #return BOOL 指定的广告类型是否是正在展示
 */
- (BOOL)isShown;

// 广告排序
- (void)sortAdWithAgentQueue:(NSArray*)agentQueue;

@end
