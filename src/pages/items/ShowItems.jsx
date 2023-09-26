import { Link, useParams } from "react-router-dom";
import useStock from "../../hooks/useStock";
import DeleteButton from "../../components/DeleteButton";

function dataBrasil(data) {
  const formatoBrasileiro = new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  return formatoBrasileiro.format(data);
}

export default function ShowItem() {
  const { getItem } = useStock();
  const { id } = useParams();

  const item = getItem(id);

  return (
    <div className="item">
      <h2>{item.name}</h2>
      <Link to={`/items/${item.id}/update`} className="button is-small">
        Atualizar
      </Link>
      <DeleteButton itemId={item.id} itemName={item.name} />
      <div className="row">
        <span>Categoria: {item.category}</span>
        <span>Quantidade em estoque: {item.quantity}</span>
        <span>Preço: R$ {item.price}</span>
      </div>
      <p>{item.description}</p>
      <div className="row">
        <p>Cadastrado em: {dataBrasil(item?.createdAt)}</p>
        <p>Atualizado em: {dataBrasil(item?.updatedAt)}</p>
      </div>
    </div>
  );
}
