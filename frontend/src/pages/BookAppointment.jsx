import React, { useState } from "react"; // 1. Added useState
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createAppointment } from "../services/appointmentsApi";
import { CheckCircleOutlined } from "@ant-design/icons"; // Added success icon
import {
  Form,
  Input,
  DatePicker,
  Select,
  Button,
  ConfigProvider,
  message,
} from "antd";

const BookAppointment = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();
  const queryClient = useQueryClient();

  // Create an Ant Design form instance to programmatically control it
  const [form] = Form.useForm();

  // State tracker to show a success screen during the redirect delay
  const [isSuccessfullyBooked, setIsSuccessfullyBooked] = useState(false);

  const { name, specialty, timeSlots } = location.state?.doctor || {};

  // React Query Mutation
  const { mutate, isPending } = useMutation({
    mutationFn: createAppointment,
    onSuccess: () => {
      messageApi.open({
        type: "success",
        content: "Appointment requested successfully!",
        duration: 5,
      });

      // Invalidate the stale query cache completely
      queryClient.invalidateQueries({ queryKey: ["appointments"] });
      form.resetFields(); // clear all input fields in the background
      setIsSuccessfullyBooked(true); // Switch the card UI to a clean success view

      setTimeout(() => navigate("/doctors"), 5000); // redirect to doctors page after 5 seconds
    },
    onError: (err) => {
      messageApi.open({
        type: "error",
        content: `Booking failed: ${err.message}`,
        duration: 5,
      });
    },
  });

  // Handle Form Submission
  const onFinish = (values) => {
    const formattedDate = values.appointmentDate.format("YYYY-MM-DD");

    const payload = {
      doctor: id,
      patientName: values.patientName,
      patientEmail: values.patientEmail,
      reasonForVisit: values.reasonForVisit,
      appointmentDate: formattedDate,
      appointmentTime: values.appointmentTime,
    };

    mutate(payload);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)] px-4">
      {contextHolder}

      <div className="w-full max-w-lg bg-slate-900 border border-slate-800 p-8 rounded-2xl shadow-xl space-y-6 transition-all duration-300">
        {/* CONDITIONAL RENDER: Show success state screen if booked, otherwise show the form */}
        {isSuccessfullyBooked ? (
          <div className="text-center py-12 space-y-4 animate-fade-in">
            <CheckCircleOutlined className="text-6xl text-emerald-500 animate-bounce" />
            <h2 className="text-2xl font-bold text-slate-100 mt-4">
              Booking Confirmed!
            </h2>
            <p className="text-slate-400 max-w-sm mx-auto text-sm">
              Your appointment request with <strong>{name}</strong> has been
              transmitted to our clinical desk. Redirecting you to the medical
              team directory...
            </p>
          </div>
        ) : (
          <>
            <div className="text-center">
              <h2 className="text-2xl font-bold text-slate-100">
                Book Appointment
              </h2>
              <p className="text-sm text-blue-400 mt-1">
                with {name} ({specialty})
              </p>
            </div>

            <ConfigProvider
              theme={{
                components: {
                  Form: {
                    labelColor: "rgba(255, 255, 255, 0.85)",
                  },
                },
              }}
            >
              <Form
                form={form}
                layout="vertical"
                onFinish={onFinish}
                disabled={isPending}
              >
                <Form.Item
                  label="Patient Name"
                  name="patientName"
                  rules={[
                    { required: true, message: "Please input your name!" },
                  ]}
                >
                  <Input size="large" placeholder="John Doe" />
                </Form.Item>

                <Form.Item
                  label="Patient Email"
                  name="patientEmail"
                  rules={[
                    { required: true, message: "Please enter your email!" },
                    {
                      type: "email",
                      message: "Please enter a valid email address!",
                    },
                  ]}
                >
                  <Input size="large" placeholder="john@example.com" />
                </Form.Item>

                <Form.Item
                  label="Reason for Visit"
                  name="reasonForVisit"
                  rules={[
                    {
                      required: true,
                      message: "Please enter the reason for your visit!",
                    },
                  ]}
                >
                  <Input.TextArea
                    rows={4}
                    placeholder="Briefly describe your symptoms..."
                  />
                </Form.Item>

                <Form.Item
                  label="Appointment Date"
                  name="appointmentDate"
                  rules={[
                    {
                      required: true,
                      message: "Appointment Date is required!",
                    },
                  ]}
                >
                  <DatePicker size="large" className="w-full" />
                </Form.Item>

                <Form.Item
                  label="Appointment Time"
                  name="appointmentTime"
                  rules={[
                    {
                      required: true,
                      message: "Appointment Time is required!",
                    },
                  ]}
                >
                  <Select
                    size="large"
                    className="w-full"
                    placeholder="Choose a time slot"
                  >
                    {timeSlots?.map((slot) => (
                      <Select.Option key={slot} value={slot}>
                        {slot}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>

                <Form.Item className="mt-8 mb-0">
                  <Button
                    type="primary"
                    htmlType="submit"
                    size="large"
                    className="w-full bg-blue-600 hover:bg-blue-700 h-12 text-base font-semibold"
                    loading={isPending}
                  >
                    {isPending ? "Booking..." : "Confirm Appointment"}
                  </Button>
                </Form.Item>
              </Form>
            </ConfigProvider>
          </>
        )}
      </div>
    </div>
  );
};

export default BookAppointment;
