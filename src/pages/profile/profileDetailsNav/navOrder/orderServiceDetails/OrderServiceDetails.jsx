import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { createContext, useState } from "react";
import { TailSpin } from "react-loader-spinner";
import { useParams } from "react-router-dom";
import CartItem from "../../../../../components/cartItem/CartItem";
import "./orderServiceDetails.scss";

export default function OrderServiceDetails(props) {
  var { id } = useParams();
  return (
    <div className="OrderServiceDetails">
      <div className="service-details-wrap">
        <div className="service-container">
          <div className="seller"></div>
          <div className="title">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem,
            necessitatibus.
          </div>

          <img
            className="service-img"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5o1JEx5HkuIza83FgPMcXYA5aylxAwGXGyA&usqp=CAU"
            alt=""
          />
          <h1>About</h1>
          <div className="details">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem
            mollitia alias ipsa labore inventore? Veniam pariatur inventore
            necessitatibus et numquam atque! Magni quod aliquid at, recusandae
            saepe perspiciatis nulla maiores accusamus et corporis neque.
            Voluptate voluptas fugit mollitia rem iusto quisquam, distinctio
            quas impedit facere quibusdam explicabo fuga delectus dolore!
            <br />
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus
            consequuntur ut error quos omnis voluptatibus qui sapiente natus
            sunt cupiditate dolor veritatis fuga, reiciendis eos fugit similique
            debitis odio suscipit deserunt quibusdam perferendis, unde facere!
            Rerum fuga nihil deleniti natus? Beatae, repellat dicta! Minus
            dolore tenetur itaque doloremque facilis provident.
            <br />
          </div>
          <h3>Additional details</h3>
          <div className="additional-details">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem
            mollitia alias ipsa labore inventore? Veniam pariatur inventore
            necessitatibus et numquam atque! Magni quod aliquid at, recusandae
            saepe perspiciatis nulla maiores accusamus et corporis neque.
            Voluptate voluptas fugit mollitia rem iusto quisquam, distinctio
            quas impedit facere quibusdam explicabo fuga delectus dolore!
          </div>
        </div>
      </div>
    </div>
  );
}
