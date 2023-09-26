import { useState } from "react";
import PropTypes from "prop-types";
import { useSearchParams } from "react-router-dom";
import StockItem from "../models/StockItem";
import useStock from "../hooks/useStock";
import { useRef } from "react";
import UpdateItem from "../pages/items/UpdateItem";

ItemForm.propTypes = {
  itemToUpdate: PropTypes.object,
};

const CATEGORIES = ["jogos", "Livros", "Brinquedos", "Acessórios"];

export default function ItemForm({ itemToUpdate }) {
  const defaultItem = {
    name: "",
    description: "",
    quantity: 0,
    price: 0,
    category: "",
  };

  const [item, setItem] = useState(itemToUpdate ? itemToUpdate : defaultItem);
  const { addItem, updateItem } = useStock();
  const inputRef = useRef(null);

  const handleChange = (ev) => {
    setItem((currentState) => {
      return {
        ...currentState,
        [ev.target.name]: ev.target.value,
      };
    });
  };

  const handleSubmit = (ev) => {
    ev.preventDefault(); //prevenir o comportamento padrão

    try {
      if (itemToUpdate) {
        updateItem(itemToUpdate.id, item);
        alert("Item atualizado com sucesso !");
      } else {
        const validItem = new StockItem(item);
        addItem(validItem);
        setItem(defaultItem);
        alert("Item cadastrado com sucesso !");
        inputRef.current.focus();
      }
    } catch (error) {
      console.log(error.message);
    } finally {
      inputRef.current.focus();
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="row">
        <div>
          <label htmlFor="name">Nome</label>
          <input type="text" name="name" id="name" required ref={inputRef} value={item.name} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="quantity">Quantidade</label>
          <input type="number" name="quantity" id="quantity" required min={0} step={1} value={item.quantity} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="price">Preço</label>
          <input type="number" name="price" id="price" required min={0.0} step={0.01} value={item.price} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="category">Categoria</label>
          <select name="category" id="category" required value={item.category} onChange={handleChange}>
            <option disabled value="">
              Selecione uma categoria...
            </option>
            {CATEGORIES.map((category) => (
              <option key={category} value={category} defaultChecked={item.category === category}>
                {category}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="form-control">
        <label htmlFor="description">Descrição</label>
        <textarea name="description" id="description" required rows={6} value={item.description} onChange={handleChange}></textarea>
      </div>
      <button className="button is-primary is-large">Salvar</button>
    </form>
  );
}
