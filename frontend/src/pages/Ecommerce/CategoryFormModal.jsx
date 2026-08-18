import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import Modal from "@/components/common/Modal/Modal";
import Input from "@/components/common/Input/Input";
import Button from "@/components/common/Button/Button";

const schema = yup.object().shape({
  name: yup.string().required("Category name is required")
});

export default function CategoryFormModal({ open, onClose, onSubmit, submitting, initialValues }) {
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
    defaultValues: { name: "" }
  });

  useEffect(() => {
    if (open) {
      reset(initialValues || { name: "" });
    }
  }, [open, initialValues, reset]);

  const submit = async (values) => {
    await onSubmit(values);
  };

  const isEdit = !!initialValues;

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={isEdit ? "Edit Category" : "Create Category"}
      size="sm"
      footer={
        <>
          <Button variant="outline" onClick={onClose} disabled={submitting}>Cancel</Button>
          <Button variant="primary" onClick={handleSubmit(submit)} loading={submitting}>
            {isEdit ? "Update Category" : "Create Category"}
          </Button>
        </>
      }
    >
      <form onSubmit={handleSubmit(submit)}>
        <Input 
          label="Category Name *" 
          placeholder="e.g. Electronics"
          error={errors.name?.message} 
          {...register("name")} 
        />
      </form>
    </Modal>
  );
}
