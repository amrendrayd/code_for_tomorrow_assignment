import { Request, Response } from "express";
import Service from "../models/service.model";
import PriceOption from "../models/priceOption.model";

// Add a new service to a category
export const addService = async (req: Request, res: Response) => {
  try {
    const { categoryId } = req.params;
    const { name, type, priceOptions } = req.body;

    // Validate required fields
    if (!name || !type) {
      return res.status(400).json({ message: "Service name and type are required" });
    }

    const service = new Service({ category: categoryId, name: name.trim(), type: type.trim() });
    await service.save();

    if (priceOptions && Array.isArray(priceOptions)) {
      const options = priceOptions.map((po: any) => ({
        ...po,
        service: service._id,
      }));
      await PriceOption.insertMany(options);
    }

    res.status(201).json(service);
  } catch (error: any) {
    console.error("Add Service Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get all services inside a category
export const getServices = async (req: Request, res: Response) => {
  try {
    const { categoryId } = req.params;
    const services = await Service.find({ category: categoryId });
    res.status(200).json(services);
  } catch (error: any) {
    console.error("Get Services Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Update a service (and its price options)
export const updateService = async (req: Request, res: Response) => {
  try {
    const { categoryId, serviceId } = req.params;
    const { name, type, priceOptions } = req.body;

    if (!name || !type) {
      return res.status(400).json({ message: "Service name and type are required" });
    }

    const service = await Service.findOneAndUpdate(
      { _id: serviceId, category: categoryId },
      { name: name.trim(), type: type.trim() },
      { new: true }
    );

    if (!service) {
      return res.status(404).json({ message: "Service not found" });
    }

    // Update price options
    if (priceOptions && Array.isArray(priceOptions)) {
      // Remove old options
      await PriceOption.deleteMany({ service: serviceId });
      // Add new options
      const options = priceOptions.map((po: any) => ({ ...po, service: serviceId }));
      await PriceOption.insertMany(options);
    }

    res.status(200).json(service);
  } catch (error: any) {
    console.error("Update Service Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Delete a service (and its price options)
export const deleteService = async (req: Request, res: Response) => {
  try {
    const { categoryId, serviceId } = req.params;

    const service = await Service.findOneAndDelete({ _id: serviceId, category: categoryId });

    if (!service) {
      return res.status(404).json({ message: "Service not found" });
    }

    await PriceOption.deleteMany({ service: serviceId });

    res.status(200).json({ message: "Service deleted" });
  } catch (error: any) {
    console.error("Delete Service Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
