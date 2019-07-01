<template>
    <svg
        :class="svgClass"
        aria-hidden="true"
        :style="{ fontSize: size + 'px' }"
    >
        <use :xlink:href="iconName" />
    </svg>
</template>

<script>
export default {
    name: 'SvgIcon',
    props: {
        iconClass: {
            type: String,
            default: 'home',
            required: true
        },
        className: {
            type: String,
            default: ''
        },
        size: {
            type: Number,
            default: 16
        }
    },
    computed: {
        iconName() {
            return `#icon-${this.iconClass}`;
        },
        svgClass() {
            if (this.className) {
                return 'svg-icon ' + this.className;
            } else {
                return 'svg-icon';
            }
        }
    }
};
</script>

<style scoped>
.svg-icon {
    width: 1em;
    height: 1em;
    vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;
}
</style>
