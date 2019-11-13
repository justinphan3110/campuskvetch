import React, { Component } from 'react'
import { View, Text, StyleSheet, Image, Dimensions, TouchableOpacity } from 'react-native'
import config from "../../config"
import axios from 'axios';
import {REST_CONNECTION, COMPLAIN, INCREASE_LIKE, DECREASE_LIKE} from 'react-native-dotenv';

class Post extends Component {
    constructor(props) {
        super(props);

        const {id} = this.props;
        const {description} = this.props;
        const {date} = this.props;
        const{like} = this.props;
        const{dislike} = this.props;
        const {comment} = this.props

        this.state = {
            id,
            description,
            like,
            dislike,
            date,
            screenWidth: Dimensions.get("window").width,
            liked: false
        };
    }

    onSinglePress = () => {
        this.likeToggled();
    }

    onDoublePress = (date) => {
        const time = new Date().getTime();
        const delta = time - this.lastPress;

        const DOUBLE_PRESS_DELAY = 400;
        if (delta < DOUBLE_PRESS_DELAY) {
            this.likeToggled()
        }
        this.lastPress = time;
    };

    componentDidUpdate(prevProps){
        if (this.props.like != prevProps.like 
                || this.props.dislike != prevProps.dislike){
            this.setState({
                like: this.props.like,
                dislike: this.props.dislike
            })
        }
    }

    likeToggled(){

        if(!this.state.liked)
            this.incLikeToggled()
        else
            this.decLikeToggled()

        this.setState({
            liked: !this.state.liked
        });

    }

    incLikeToggled() {
        axios.patch(REST_CONNECTION + COMPLAIN + INCREASE_LIKE + this.state.id)
             .then((response) => {
             }).catch(error => console.log(error))
    }

    decLikeToggled() {
        axios.patch(REST_CONNECTION + COMPLAIN + DECREASE_LIKE + this.state.id)
             .then((response) => {
             }).catch(error => console.log(error))
    }

    

    render() {
        const likeIconColor = (this.state.liked) ? "rgb(41,215,184)" : null;

        return (
            <View>
                <View style={styles.userBar}>
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <Image style={styles.userPic}
                            source={config.images.anonymousAVA}
                        />
                        <Text style={{ fontSize: 13, marginLeft: 10 }}>Anonymous @ Case Western Reserve University (CWRU) </Text>
                    </View>
                    <View>

                    </View>

                </View>

                <TouchableOpacity activeOpacity={0.7} onPress={this.onDoublePress}>
                    <View>
                        <Text style={{ fontSize: 13, marginLeft: 10 }}> {this.state.description} </Text>
                    </View>
                </TouchableOpacity>
                <View style={styles.iconBar}>

                    <TouchableOpacity activeOpacity={1} onPress={this.onSinglePress}>
                        <Image style={[styles.icon, {height: 40, width: 40, tintColor: likeIconColor}]} source={config.images.likeIcon} />
                    </TouchableOpacity>
                    <Text>Like · {this.state.like}</Text>
                    <Image style={[styles.icon, {height: 40, width:40}]}source={config.images.addCommentIcon} />
                    <Text>Comment · 1</Text>
                </View>

            </View>
        )
    }
}

const styles = StyleSheet.create({
    titleBar: {
        width: 100 + "%",
        height: 56,
        marginTop: 10,
        backgroundColor: "rgb(250,250,250)",
        borderBottomColor: "rgb(233,233,233)",
        borderBottomWidth: StyleSheet.hairlineWidth,
        justifyContent: "center",
        alignItems: "center"
    },
    userBar: {
        width: 100 + "%",
        height: 50,
        backgroundColor: "rgb(255,255,255)",
        flexDirection: "row",
        paddingHorizontal: 10
    },
    userPic: {
        height: 40,
        width: 40,
        borderRadius: 20
    },
    iconBar: {
        height: 50,
        width: 100 + "%",
        borderBottomColor: "rgb(233,233,233)",
        borderBottomWidth: StyleSheet.hairlineWidth,
        flexDirection: "row",
        alignItems: "center"
    },
    icon: {
        marginLeft: 5,
        marginTop: -20,
    }
});

export default Post;