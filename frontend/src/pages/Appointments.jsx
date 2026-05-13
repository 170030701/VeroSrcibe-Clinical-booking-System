import { useState } from "react"; // 1. Import useState
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Loader from "../components/Loader";
import {
  CheckOutlined,
  CloseOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import {
  getAppointments,
  updateAppointmentStatus,
} from "../services/appointmentsApi";
import { Table, Button, Space, Tag, message, Spin } from "antd";

const Appointments = () => {
  const queryClient = useQueryClient();
  const [messageApi, contextHolder] = message.useMessage();

  // Track which row IDs are processing an update transition, allowing us to show a loader only on those specific rows
  const [updatingRowIds, setUpdatingRowIds] = useState([]);

  // Helper to color-code status tag.-- As it is a small application im not creating a separate file for it but in a larger app this would be in a utils or constants file
  const getStatusTag = (status) => {
    switch (status) {
      case "Confirmed":
        return <Tag color="success">CONFIRMED</Tag>;
      case "Cancelled":
        return <Tag color="error">CANCELLED</Tag>;
      default:
        return <Tag color="warning">PENDING</Tag>;
    }
  };

  const { data, isLoading, isError } = useQuery({
    queryKey: ["appointments"],
    queryFn: getAppointments,
    staleTime: 10 * 60 * 1000,
  });

  // React Query Mutation
  const { mutate: updateStatus } = useMutation({
    mutationFn: updateAppointmentStatus,
    onSuccess: async (updatedData, variables) => {
      messageApi.success(
        `Appointment successfully updated to ${updatedData.status}!`,
      );

      // Await the invalidation so it fully refetches the fresh database state first
      await queryClient.invalidateQueries({ queryKey: ["appointments"] });

      // Smoothly remove the row ID from our loading array AFTER data is fresh
      setUpdatingRowIds((prev) => prev.filter((id) => id !== variables.id));
    },
    onError: (err, variables) => {
      messageApi.error(`Update failed: ${err.message}`);
      // Remove tracker on error so the buttons restore immediately
      setUpdatingRowIds((prev) => prev.filter((id) => id !== variables.id));
    },
  });

  const handleStatusChange = (id, status) => {
    setUpdatingRowIds((prev) => [...prev, id]);
    updateStatus({ id, status });
  };

  //  Table headers which is specific to antd Table component
  const columns = [
    {
      title: "Patient Name",
      dataIndex: "patientName",
      key: "patientName",
      render: (text) => <span className="font-semibold">{text}</span>,
    },
    {
      title: "Patient Email",
      dataIndex: "patientEmail",
      key: "patientEmail",
    },
    {
      title: "Doctor Name",
      dataIndex: ["doctor", "name"],
      key: "doctorName",
    },
    {
      title: "Date",
      dataIndex: "appointmentDate",
      key: "appointmentDate",
      render: (date) =>
        new Date(date).toLocaleDateString("en-US", { timeZone: "UTC" }),
    },
    {
      title: "Time",
      dataIndex: "appointmentTime",
      key: "appointmentTime",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => getStatusTag(status),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => {
        const isRowTransitioning = updatingRowIds.includes(record._id);

        if (isRowTransitioning) {
          return (
            <div className="flex items-center justify-center w-[150px]">
              <LoadingOutlined className="text-blue-500 animate-spin" />
            </div>
          );
        }

        // Show buttons ONLY if status is Pending
        if (record.status === "Pending") {
          return (
            <Space size="middle" className="w-[150px]">
              <Button
                type="primary"
                className="bg-emerald-600 hover:bg-emerald-700 border-none"
                icon={<CheckOutlined />}
                size="small"
                onClick={() => handleStatusChange(record._id, "Confirmed")}
              >
                Confirm
              </Button>
              <Button
                danger
                type="primary"
                className="bg-rose-600 hover:bg-rose-700 border-none"
                icon={<CloseOutlined />}
                size="small"
                onClick={() => handleStatusChange(record._id, "Cancelled")}
              >
                Cancel
              </Button>
            </Space>
          );
        }

        return null;
      },
    },
  ];

  if (!isLoading && data?.length === 0) {
    return (
      <div className="w-full h-[60vh] flex items-center justify-center">
        <h3 className="text-white text-xl">
          No appointments found. Please check back later.
        </h3>
      </div>
    );
  }

  if (!isLoading && isError) {
    return (
      <div className="w-full h-[60vh] flex items-center justify-center">
        <h3 className="text-white text-xl">
          Oops! Something went wrong while fetching appointments. Please try
          again later.
        </h3>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {contextHolder}
      <p className="text-2xl font-bold text-slate-50 pt-2 pb-4">Appointments</p>
      {isLoading ? (
        <Loader />
      ) : (
        <Table
          columns={columns}
          dataSource={data}
          loading={isLoading}
          rowKey="_id"
          bordered
          className="[&_.ant-pagination]:text-white [&_.ant-pagination-item-link_svg]:fill-white"
        />
      )}
    </div>
  );
};

export default Appointments;
