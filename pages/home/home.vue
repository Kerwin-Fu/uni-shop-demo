<template>
	<view>
		<view>
			<!-- 轮播图 -->
			<swiper :indicator-dots="true" :autoplay="true" :interval="2000" :duration="1000" circular>
				<swiper-item v-for="(item, index) in swiperList" :key="item.goods_id">
					<navigator class="swiper-item" :url="`/subpkg/goods_detail/goods_detail?goods_id=${item.goods_id}`">
						<image :src="item.image_src"></image>
					</navigator>
				</swiper-item>
			</swiper>

			<!-- 导航图标 -->
			<view class="nav-list">
				<view class="nav-item" v-for="(item, index) in navList" :key="index" @click="navClickHandler(item)">
					<image :src="item.image_src" class="nav-img" />
				</view>
			</view>

			<!-- 商品楼层 -->
			<view class="floor-list">
				<view class="floor-item" v-for="(item, index) in floorList" :key="index">
					<!-- 标题图片 -->
					<image :src="item.floor_title.image_src" mode="" class="floor-title" />
					<!-- 下边商品分类图片 -->
					<view class="floor-img-box">
						<!-- 左边长图片 -->
						<navigator class="left-img-box" :url="item.product_list[0].url">
							<image 
							:src="item.product_list[0].image_src" 
							mode="widthFix" 
							:style="{width: item.product_list[0].image_width + 'rpx'}">
							</image>
						</navigator>
						<!-- 右边小图片 -->
						<view class="right-img-box">
							<navigator class="right-img-item" 
							v-for="(item2, index2) in item.product_list" 
							:key="index2" 
							v-if="index2 !== 0"
							:url="item2.url"
							>	
								<image 
								:src="item2.image_src" 
								mode="widthFix" 
								:style="{width: item2.image_width + 'rpx'}">
								</image>
							</navigator>
						</view>
					</view>
				</view>
			</view>

		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				swiperList: [],
				navList: [],
				floorList: []
			};
		},
		onLoad() {
			this.getSwiperList()
			this.getNavList()
			this.getFloorList()
		},
		methods: {
			async getSwiperList() {
				const {
					data: res
				} = await uni.$http.get('/api/public/v1/home/swiperdata')
				if (res.meta.status !== 200) return uni.$showMsg()
				// 3.3 请求成功，为 data 中的数据赋值

				this.swiperList = res.message
			},
			async getNavList() {
				const {
					data: res
				} = await uni.$http.get('/api/public/v1/home/catitems')
				if (res.meta.status !== 200) return uni.$showMsg()
				console.log(res)
				this.navList = res.message
			},
			async getFloorList() {
				const {
					data: res
				} = await uni.$http.get('/api/public/v1/home/floordata')
				if (res.meta.status !== 200) return uni.$showMsg()
				 // 通过双层 forEach 循环，处理 URL 地址
				  res.message.forEach(floor => {
				    floor.product_list.forEach(prod => {
				      prod.url = '/subpkg/goods_list/goods_list?' + prod.navigator_url.split('?')[1]
				    })
				  })
				this.floorList = res.message
			},
			navClickHandler(item) {
				if (item.name === '分类') {
					uni.switchTab({
						url: '../cate/cate'
					})
				}
			}
		}
	}
</script>

<style lang="scss">
	swiper {
		height: 330rpx;
	}

	.swiper-item,
	image {
		width: 100%;
		height: 100%;
	}

	.nav-list {
		display: flex;
		justify-content: space-around;
		margin: 15px 0;

		.nav-img {
			width: 128rpx;
			height: 140rpx;
		}
	}

	.floor-title {
		height: 60rpx;
		width: 100%;
	}
	
	.right-img-box {
	  display: flex;
	  flex-wrap: wrap;
	  justify-content: space-around;
	}
	
	.floor-img-box {
	  display: flex;
	  padding-left: 10rpx;
	}
</style>
