exports.updateOrderStatus = (req, res) => {
    const { orderId, status } = req.body;
    db.query(
        "UPDATE orders SET status = ? WHERE id = ?",
        [status, orderId],
        (err, result) => {
            if (err) return res.status(500).json({ error: err });
            res.json({ message: "Order status updated." });
        }
    );
};

exports.trackOrder = (req, res) => {
    const { orderId } = req.params;
    db.query(
        "SELECT status FROM orders WHERE id = ?",
        [orderId],
        (err, result) => {
            if (err) return res.status(500).json({ error: err });
            if (result.length === 0) return res.status(404).json({ message: "Order not found" });
            res.json({ status: result[0].status });
        }
    );
};
