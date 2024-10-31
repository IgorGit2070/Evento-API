import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card, Button, Modal, Form, Alert } from 'react-bootstrap';
import styles from './ListaParticipante.module.css';

const url = "http://localhost:5000/participantes";

const ListaParticipante = () => {
    const { id } = useParams();
    const [participantes, setParticipantes] = useState([]);
    const [modalShow, setModalShow] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [currentParticipante, setCurrentParticipante] = useState(null);
    const [alert, setAlert] = useState({ show: false, message: "", variant: "success" });
    const [loading, setLoading] = useState(false);
    const [confirmDeleteId, setConfirmDeleteId] = useState(null);
    const [confirmDeleteModalShow, setConfirmDeleteModalShow] = useState(false);

    useEffect(() => {
        const fetchParticipantes = async () => {
            try {
                const res = await fetch(`${url}?evento_id=${id}`);
                const data = await res.json();
                setParticipantes(data);
            } catch (error) {
                console.error("Erro ao buscar participantes:", error);
            }
        };
        fetchParticipantes();
    }, [id]);

    const handleShow = (participante = null) => {
        setCurrentParticipante(participante);
        setIsEditing(!!participante);
        setModalShow(true);
    };

    const handleClose = () => {
        setModalShow(false);
        setCurrentParticipante(null);
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
            setParticipantes(participantes.filter(participante => participante.id !== confirmDeleteId));
            showAlert("Participante excluído com sucesso.", "success");
        } catch (error) {
            console.error("Erro ao excluir participante:", error);
            showAlert("Erro ao excluir participante.", "danger");
        } finally {
            setLoading(false);
            handleConfirmDeleteClose();
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const formData = {
            nome: e.target.nome.value,
            email: e.target.email.value,
            evento_id: id
        };

        try {
            if (isEditing) {
                await fetch(`${url}/${currentParticipante.id}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(formData),
                });
                setParticipantes(participantes.map(participante =>
                    participante.id === currentParticipante.id ? { ...participante, ...formData } : participante
                ));
            } else {
                const res = await fetch(url, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(formData),
                });
                const newParticipante = await res.json();
                setParticipantes([...participantes, newParticipante]);
            }
            handleClose();
            showAlert("Participante salvo com sucesso.", "success");
        } catch (error) {
            console.error("Erro ao salvar participante:", error);
            showAlert("Erro ao salvar participante.", "danger");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={`${styles.container} mt-4`}>
            <h2 className={styles.title}>Participantes do Evento {id}</h2>
            <Alert className={styles.alert} show={alert.show} variant={alert.variant}>{alert.message}</Alert>
            <Button variant="primary" onClick={() => handleShow()}>
                Adicionar Novo Participante
            </Button>
            <div className={`row mt-3 ${styles.row}`}>
                {participantes.map(participante => (
                    <div key={participante.id} className={`col-md-3 mb-3`}>
                        <Card className={styles.card}>
                            <Card.Body>
                                <Card.Title>{participante.nome}</Card.Title>
                                <Card.Text>{participante.email}</Card.Text>
                                <div className={styles.buttonGroup}>
                                    <Button variant="info" onClick={() => handleShow(participante)} disabled={loading}>
                                        Editar
                                    </Button>
                                    <Button variant="danger" onClick={() => handleConfirmDeleteShow(participante.id)} disabled={loading}>
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
                    Você tem certeza que deseja excluir este participante?
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
                    <Modal.Title>{isEditing ? 'Editar Participante' : 'Adicionar Participante'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Control
                                type="text"
                                name="nome"
                                placeholder="Nome"
                                defaultValue={currentParticipante ? currentParticipante.nome : ''}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Control
                                type="email"
                                name="email"
                                placeholder="Email"
                                defaultValue={currentParticipante ? currentParticipante.email : ''}
                                required
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit" disabled={loading}>
                            {isEditing ? 'Atualizar Participante' : 'Adicionar Participante'}
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default ListaParticipante;
