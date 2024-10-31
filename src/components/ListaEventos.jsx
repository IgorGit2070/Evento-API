import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, Button, Modal, FloatingLabel, Form, Alert } from 'react-bootstrap';
import styles from './ListaEventos.module.css';

const url = "http://localhost:5000/eventos";

const ListaEventos = () => {
    const [eventos, setEventos] = useState([]);
    const [modalShow, setModalShow] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [currentEvent, setCurrentEvent] = useState(null);
    const [alert, setAlert] = useState({ show: false, message: "", variant: "success" });
    const [loading, setLoading] = useState(false);
    const [confirmDeleteId, setConfirmDeleteId] = useState(null);
    const [confirmDeleteModalShow, setConfirmDeleteModalShow] = useState(false);

    useEffect(() => {
        const fetchEventos = async () => {
            try {
                const res = await fetch(url);
                const data = await res.json();
                setEventos(data);
            } catch (error) {
                console.error("Erro ao buscar eventos:", error);
            }
        };
        fetchEventos();
    }, []);

    const handleShow = (evento = null) => {
        setCurrentEvent(evento);
        setIsEditing(!!evento);
        setModalShow(true);
    };

    const handleClose = () => {
        setModalShow(false);
        setCurrentEvent(null);
        setIsEditing(false);
    };

    const showAlert = (message, variant = "success") => {
        setAlert({ show: true, message, variant });
        setTimeout(() => setAlert({ show: false, message: "", variant: "success" }), 3000);
    };

    const handleConfirmDeleteShow = (id) => {
        setConfirmDeleteId(id);
        setConfirmDeleteModalShow(true);
    };

    const handleConfirmDeleteClose = () => {
        setConfirmDeleteId(null);
        setConfirmDeleteModalShow(false);
    };

    const handleDelete = async () => {
        setLoading(true);
        try {
            await fetch(`${url}/${confirmDeleteId}`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
            });
            setEventos(eventos.filter(evento => evento.id !== confirmDeleteId));
            showAlert("Evento excluído com sucesso.", "success");
        } catch (error) {
            console.error("Erro ao excluir evento:", error);
            showAlert("Erro ao excluir evento.", "danger");
        } finally {
            setLoading(false);
            handleConfirmDeleteClose();
        }
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const formData = {
            titulo: e.target.titulo.value,
            data: e.target.data.value,
            local: e.target.local.value,
            descricao: e.target.descricao.value,
        };

        try {
            if (isEditing) {
                // Atualiza evento
                await fetch(`${url}/${currentEvent.id}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(formData),
                });
                setEventos(eventos.map(evento => evento.id === currentEvent.id ? { ...evento, ...formData } : evento));
            } else {
                // Cria evento
                const res = await fetch(url, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(formData),
                });
                const newEvento = await res.json();
                setEventos([...eventos, newEvento]);
            }
            handleClose();
            showAlert("Evento salvo com sucesso.", "success");
        } catch (error) {
            console.error("Erro ao salvar evento:", error);
            showAlert("Erro ao salvar evento.", "danger");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={`container mt-4 ${styles.container}`}>
            <h2>Lista de Eventos</h2>
            <Alert show={alert.show} variant={alert.variant}>{alert.message}</Alert>
            <Button variant="primary" onClick={() => handleShow()} disabled={loading}>
                Cadastrar Novo Evento
            </Button>
            <div className={`row mt-3 ${styles.row}`}>
                {eventos.map(evento => (
                    <div key={evento.id} className="col-md-4 mb-3">
                        <Card className={styles.card}>
                            <Card.Body>
                                <Card.Title className={styles.cardTitle}>{evento.titulo}</Card.Title>
                                <Card.Text className={styles.cardText}>
                                    {evento.data} | {evento.local}
                                    <br />
                                    {evento.descricao}
                                </Card.Text>
                                <div className={styles.buttonGroup}>
                                    <Link to={`/participantes/${evento.id}`}>
                                        <Button variant="primary">Ver Participantes</Button>
                                    </Link>
                                    <Button variant="info" onClick={() => handleShow(evento)} disabled={loading}>
                                        Editar
                                    </Button>
                                    <Button variant="danger" onClick={() => handleConfirmDeleteShow(evento.id)} disabled={loading}>
                                        Excluir
                                    </Button>

                                </div>
                            </Card.Body>
                        </Card>
                    </div>
                ))}
            </div>

            <Modal show={confirmDeleteModalShow} onHide={handleConfirmDeleteClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Confirmar Exclusão</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Você tem certeza que deseja excluir este evento?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleConfirmDeleteClose}>
                        Cancelar
                    </Button>
                    <Button variant="danger" onClick={handleDelete}>
                        Excluir
                    </Button>
                </Modal.Footer>
            </Modal>


            <Modal show={modalShow} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>{isEditing ? 'Editar Evento' : 'Cadastrar Evento'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <FloatingLabel controlId="titulo" label="Título" className="mb-3">
                            <Form.Control
                                type="text"
                                placeholder="Título"
                                defaultValue={currentEvent ? currentEvent.titulo : ''}
                                required
                                disabled={loading}
                            />
                        </FloatingLabel>
                        <FloatingLabel controlId="data" label="Data" className="mb-3">
                            <Form.Control
                                type="date"
                                defaultValue={currentEvent ? currentEvent.data : ''}
                                required
                                disabled={loading}
                            />
                        </FloatingLabel>
                        <FloatingLabel controlId="local" label="Local" className="mb-3">
                            <Form.Control
                                type="text"
                                placeholder="Local"
                                defaultValue={currentEvent ? currentEvent.local : ''}
                                required
                                disabled={loading}
                            />
                        </FloatingLabel>
                        <FloatingLabel controlId="descricao" label="Descrição" className="mb-3">
                            <Form.Control
                                as="textarea"
                                placeholder="Descrição"
                                defaultValue={currentEvent ? currentEvent.descricao : ''}
                                required
                                disabled={loading}
                            />
                        </FloatingLabel>
                        <Button variant="primary" type="submit" disabled={loading}>
                            {isEditing ? 'Atualizar Evento' : 'Cadastrar Evento'}
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default ListaEventos;
