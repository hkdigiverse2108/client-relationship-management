import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Modal from "@/components/common/Modal/Modal";
import Input from "@/components/common/Input/Input";
import Button from "@/components/common/Button/Button";
import { leadSchema } from "@/utils/validators";
import { LEAD_STATUS_LABEL } from "@/utils/constants";
/**
 * Reusable Lead create/edit form rendered inside a Modal.
 * `initialValues` is optional (edit mode). `onSubmit` receives validated data.
 */
export default function LeadFormModal({ open, onClose, onSubmit, initialValues, submitting }) {
  const isEdit = !!initialValues?.id;
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: yupResolver(leadSchema),
    defaultValues: initialValues || {
      name: "", email: "", phone: "", company: "",
      source: "Website", status: "new", value: "",
    },
  });
  const submit = async (values) => {
    await onSubmit(values);
    reset();
  };
  return (
    <Modal
      open={open}
      onClose={onClose}
      title={isEdit ? "Edit lead" : "Create new lead"}
      size="md"
      footer={
        <>
          <Button variant="secondary" onClick={onClose}>Cancel</Button>
          <Button onClick={handleSubmit(submit)} loading={submitting}>
            {isEdit ? "Save changes" : "Create lead"}
          </Button>
        </>
      }
    >
      <form onSubmit={handleSubmit(submit)} noValidate>
        <div className="row">
          <div className="col-md-6"><Input label="Full name" error={errors.name?.message} {...register("name")} /></div>
          <div className="col-md-6"><Input label="Email" type="email" error={errors.email?.message} {...register("email")} /></div>
          <div className="col-md-6"><Input label="Phone" error={errors.phone?.message} {...register("phone")} /></div>
          <div className="col-md-6"><Input label="Company" error={errors.company?.message} {...register("company")} /></div>
          <div className="col-md-6">
            <label className="form-label">Source</label>
            <select className="form-select mb-3" {...register("source")}>
              {["Website","Referral","Ads","Social","Cold outreach","Other"].map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
          <div className="col-md-6">
            <label className="form-label">Status</label>
            <select className="form-select mb-3" {...register("status")}>
              {Object.entries(LEAD_STATUS_LABEL).map(([k, v]) => (
                <option key={k} value={k}>{v}</option>
              ))}
            </select>
          </div>
          <div className="col-md-6"><Input label="Estimated value ($)" type="number" error={errors.value?.message} {...register("value")} /></div>
        </div>
      </form>
    </Modal>
  );
}