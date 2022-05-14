import React, {useState, useEffect} from "react";
import { v4 as uuidv4 } from 'uuid';
import { randomColor } from 'randomcolor';
import Draggable from "react-draggable";
import 'normalize.css';
import './App.css';

const App = () => {
  const [item, setItem] = useState('');
  const [items, setItems] = useState(
    JSON.parse(localStorage.getItem('items')) || []
  );

  useEffect(() => {
    localStorage.setItem('items', JSON.stringify(items))
  }, [items]);

  const newItem = () => {
    if (item.trim() !== '') {
      const newItem = {
        id: uuidv4(),
        item: item,
        color: randomColor({
          luminosity: 'light'
        }),
        defaultPosition: {
          x: 585,
          y: -155
        }
      }
      setItems((items) => [...items, newItem])
      setItem('');
    } else {
      alert('Enter something in input...');
      setItem('');
    }
  }

  const deleteItem = (id) => {
    setItems(items.filter((item) => item.id !== id));
  }

  const updatePosition = (data, index) => {
    const newArray = [...items];
    newArray[index].defaultPosition = {x: data.x, y: data.y};
    setItems(newArray);
  }

  const keyPressEnter = (e) => {
    const code = e.keyCode || e.which;
    if (code === 13) {
      newItem();
    }
  }
  return(
    <div>
      <div className="wrapper">
        <input
          className="input-task"
          value={item}
          type="text"
          placeholder="write your task..."
          onChange={(e) => setItem(e.target.value)}
          onKeyPress={(e) => keyPressEnter(e)}
        />
        <button className="enter-task"
          onClick={newItem}
        >
          Enter
        </button>
      </div>

      {
        items.map((item, index) => {
          return (
            <Draggable
              key={index}
              defaultPosition={item.defaultPosition}
              onStop={(_, data) => {
                updatePosition(data, index)
              }}
            >
              <div className="todo__item" style={{backgroundColor: item.color}}>
                {`${item.item}`}
                <button className="todo__item-delete"
                  onClick={() => deleteItem(item.id)}
                >
                  x
                </button>
              </div>
            </Draggable>
          )
        })
      }
    </div>
  )
};

export default App;