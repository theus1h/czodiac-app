import "rc-tooltip/assets/bootstrap.css"
import React from "react"
import Slider, { SliderTooltip } from "rc-slider"
import "../../assets/index.less"

const { Handle } = Slider

const SliderHandle = (props) => {
  const { value, dragging, index, ...restProps } = props
  return (
    <SliderTooltip prefixCls="rc-slider-tooltip" overlay={`${value} %`} visible={dragging} placement="top" key={index}>
      <Handle value={value} {...restProps} />
    </SliderTooltip>
  )
}

export default function CustomSlider({ min, max, defaultValue, ...rest }) {
  return <Slider min={min} max={max} defaultValue={defaultValue} handle={SliderHandle} {...rest} />
}
