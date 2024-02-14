// SCSS BabelResult Skip Results Iframe
import React, {useCallback, useState, useEffect, useRef, useMemo, memo} from 'https://cdn.skypack.dev/react@17.0.2';
import ReactDOM from 'https://cdn.skypack.dev/react-dom@17.0.2';
import PropTypes from 'https://cdn.skypack.dev/prop-types@15.7.2';
import convert from 'https://cdn.skypack.dev/color-convert@2.0.1';

// Webrix.js components - See https://webrix.amdocs.com/
import {Movable} from 'https://cdn.skypack.dev/webrix@1.4.0/components';
import {useDimensions} from 'https://cdn.skypack.dev/webrix@1.4.0/hooks';

const {transform, trackpad, update} = Movable.Operations;
const {clamp, map} = Movable.Transformers;

const HueSelector = memo(({hsv, onChange}) => {
    const movable = useRef();
    const {width} = useDimensions(movable);
    const [left, setLeft] = useState(0);

    const props = Movable.useMove(useMemo(() => [
        trackpad(movable),
        transform(v => v.left, clamp(0, width)),
        update(next => {
            setLeft(next);
            onChange(convert.hsv.rgb(map(0, width, 0, 360)(next), hsv[1], hsv[2]));
        }),
    ], [onChange, width, hsv]));

    useEffect(() => {
        setLeft(map(0, 360, 0, width)(hsv[0]));
    }, [width]);

    return (
      <Movable className='hue-selector' ref={movable} {...props}>
        <div className='pointer' style={{left, '--color': `rgb(${convert.hsv.rgb(map(0, width, 0, 360)(left), 100, 100)})`}}/>
      </Movable>
    );
});

const ShadeSelector = memo(({onChange, hsv}) => {
    const movable = useRef();
    const {width, height} = useDimensions(movable);
    const hex = useMemo(() => '#' + convert.hsv.hex(hsv[0], 100, 100), [hsv[0]]);
    const [{top, left}, setPosition] = useState({});

    const props = Movable.useMove(useMemo(() => [
        trackpad(movable),
        transform(({top, left}) => ({
            top: clamp(0, height)(top),
            left: clamp(0, width)(left),
        })),
        update(({top, left}) => {
            setPosition({top, left});
            onChange(convert.hsv.rgb(
                hsv[0],
                map(0, width, 0, 100)(left),
                map(0, height, 100, 0)(top),
            ))
        }),
    ], [onChange, width, height, setPosition, hsv]));

    useEffect(() => {
        setPosition({
            top: map(100, 0, 0, height)(hsv[2]),
            left: map(0, 100, 0, width)(hsv[1]),
        });
    }, [width, height]);

    return (
      <Movable className='shade-selector' ref={movable} style={{'--color': hex}} {...props}>
        <div className='pointer' style={{top, left, '--color': `rgb(${convert.hsv.rgb(hsv)})`}}/>
      </Movable>
    );
});

const InfoBox = ({rgb}) => (
  <div className='info-box'>
    <div title='Hex'>#{convert.rgb.hex(rgb)}</div>
    <div title='R'>{rgb[0]}</div>
    <div title='G'>{rgb[1]}</div>
    <div title='B'>{rgb[2]}</div>
  </div>
);

const ColorPicker = ({color, onChange}) => {
  const hsv = convert.rgb.hsv(color);
  return (
    <div className='color-picker'>
      <ShadeSelector hsv={hsv} onChange={onChange}/>
      <HueSelector hsv={hsv} onChange={onChange}/>
      <InfoBox rgb={color}/>
    </div>
  );
};

const App = () => {
    const [color, setColor] = useState([44,192,158]);
    return (
        <ColorPicker color={color} onChange={setColor}/>
    );
};

ReactDOM.render(<App/>, document.body);
View Compiled

Resources1× 0.5× 0.25×Rerun