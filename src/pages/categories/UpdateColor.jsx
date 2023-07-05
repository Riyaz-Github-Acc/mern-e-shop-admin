/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Button from "../../components/Button";
import ErrorMsg from "../../components/messages/ErrorMsg";
import SuccessMsg from "../../components/messages/SuccessMsg";
import CircularLoading from "../../components/loaders/CircularLoading";

import {
  fetchColorAction,
  updateColorAction,
} from "../../redux/slices/colorSlices";

const UpdateColor = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchColorAction(id));
  }, [id, dispatch]);

  const { color, loading, error, isUpdated } = useSelector(
    (state) => state?.colors
  );

  return <div>UpdateColor</div>;
};

export default UpdateColor;
