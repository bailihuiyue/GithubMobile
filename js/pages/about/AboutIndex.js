import React, { Component } from 'react'
import { Text, View, Dimensions, StyleSheet, Platform, Image } from 'react-native'
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import { connect } from 'react-redux';
import GlobalStyles from "../../common/style/GlobalStyles";
import { LeftBackButton, RightButton, ShareButton } from '../../components/Buttons';
import NavigationUtil from "../../navigator/NavigationUtil";

class AboutIndex extends Component {

  setParallaxProps(params) {
    let config = {};
    const { type, name, description } = params;
    //TODO:tips:require地址不能拼不能接变量
    const imagePath = {
      project: {
        avatar: require("../../common/image/GtiHub.png"),
        bg: require("../../common/image/GtiHub_background.jpg")
      },
      author: {
        avatar: require("../../common/image/me.jpg"),
        bg: require("../../common/image/me_background.jpg")
      },
    }
    config.renderBackground = () => (
      <View key="background">
        <Image
          style={{ width: window.width, height: PARALLAX_HEADER_HEIGHT }}
          source={imagePath[type].bg}
        />
        <View style={{
          position: 'absolute',
          top: 0,
          width: window.width,
          backgroundColor: 'rgba(0,0,0,.4)',
          height: PARALLAX_HEADER_HEIGHT
        }} />
      </View>
    );
    config.renderForeground = () => (
      <View key="parallax-header" style={styles.parallaxHeader}>
        <Image
          style={styles.avatar}
          source={imagePath[type].avatar}
        />
        <Text style={styles.sectionSpeakerText}>
          {name}
        </Text>
        <Text style={styles.sectionTitleText}>
          {description}
        </Text>
      </View>
    );
    config.renderStickyHeader = () => (
      <View key="sticky-header" style={styles.stickySection}>
        <Text style={styles.stickySectionText}>{name}</Text>
      </View>
    );
    config.renderFixedHeader = () => (
      <View key="fixed-header" style={styles.fixedSection}>
        <LeftBackButton onClick={this.handleClick.bind(this)} />
        {/* {ViewUtil.getLeftBackButton(() => NavigationUtil.goBack(this.props.navigation))}
        {ViewUtil.getShareButton(() => this.onShare())} */}
      </View>
    );
    return config;

  }

  handleClick() {
    const { navigation } = this.props;
    NavigationUtil.goBack(navigation)
  }


  render() {
    const { themeColor, children, params } = this.props;
    const renderConfig = this.setParallaxProps(params);
    return (
      <ParallaxScrollView
        backgroundColor={themeColor}
        contentBackgroundColor={GlobalStyles.backgroundColor}
        parallaxHeaderHeight={PARALLAX_HEADER_HEIGHT}
        stickyHeaderHeight={STICKY_HEADER_HEIGHT}
        backgroundScrollSpeed={10}
        {...renderConfig}
      >
        {children}
      </ParallaxScrollView>
    )
  }
}

const mapStateToProps = state => ({
  themeColor: state.reducers.theme.color
});

export default connect(mapStateToProps)(AboutIndex);

const window = Dimensions.get('window');
const AVATAR_SIZE = 90;
const PARALLAX_HEADER_HEIGHT = 300;
const TOP = (Platform.OS === 'ios') ? 20 + (DeviceInfo.isIPhoneX_deprecated ? 24 : 0) : 0;
const STICKY_HEADER_HEIGHT = (Platform.OS === 'ios') ? GlobalStyles.nav_bar_height_ios + TOP : GlobalStyles.nav_bar_height_android;

const styles = StyleSheet.create({
  background: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: window.width,
    height: PARALLAX_HEADER_HEIGHT
  },
  stickySection: {
    height: STICKY_HEADER_HEIGHT,
    alignItems: 'center',
    paddingTop: TOP
  },
  stickySectionText: {
    color: 'white',
    fontSize: 20,
    margin: 10
  },
  fixedSection: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    paddingRight: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: TOP
  },
  fixedSectionText: {
    color: '#999',
    fontSize: 20
  },
  parallaxHeader: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'column',
    paddingTop: 100
  },
  avatar: {
    marginBottom: 10,
    borderRadius: AVATAR_SIZE / 2,
    width: 80,
    height: 80
  },
  sectionSpeakerText: {
    color: 'white',
    fontSize: 24,
    paddingVertical: 5,
    marginBottom: 10
  },
  sectionTitleText: {
    color: 'white',
    fontSize: 16,
    marginRight: 10,
    marginLeft: 10
  },
});