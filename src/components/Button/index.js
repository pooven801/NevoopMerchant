import React, { Component } from "react";
import { TouchableOpacity, StyleSheet, ActivityIndicator } from "react-native";
import { BaseColor } from "@config";
import PropTypes from "prop-types";
import { Text } from "@components";
import styles from "./styles";

export default class Button extends Component {
    render() {
        const {
            style,
            styleText,
            icon,
            outline,
            full,
            half,
            round,
            activeOpacity,
            loading,
            disable,
            ...rest
        } = this.props;

        return (
            <TouchableOpacity
                {...rest}
                style={StyleSheet.flatten([
                    styles.default,
                    outline && styles.outline,
                    full && styles.full,
                    half && styles.half,
                    round && styles.round,
                    style
                ])}
                activeOpacity={activeOpacity?activeOpacity:0.9}
                disabled={disable ? true : false}
            >
                {icon ? icon : null}
                <Text
                    style={StyleSheet.flatten([
                        styles.textDefault,
                        outline && styles.textOuline,
                        styleText
                    ])}
                    numberOfLines={1}
                >
                    {this.props.children || ""}
                </Text>
                {loading ? (
                    <ActivityIndicator
                        size="small"
                        color={
                            outline
                                ? BaseColor.primaryColor
                                : BaseColor.whiteColor
                        }
                        style={{ paddingLeft: 5 }}
                    />
                ) : null}
            </TouchableOpacity>
        );
    }
}

Button.propTypes = {
    style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    icon: PropTypes.node,
    outline: PropTypes.bool,
    full: PropTypes.bool,
    half: PropTypes.bool,
    round: PropTypes.bool,
    loading: PropTypes.bool
};

Button.defaultProps = {
    style: {},
    icon: null,
    outline: false,
    full: false,
    half: false,
    round: false,
    loading: false
};
