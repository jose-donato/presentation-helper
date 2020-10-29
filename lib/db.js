
import firebase from './firebase';

const firestore = firebase.firestore();

export async function createRoom(slug, data) {
    const exists = await checkIfRoomExists(slug)
    if (!exists) {
        await firestore.collection('rooms').doc(slug).set(data);
        return true;
    }
    return false;
}

export async function getRoom(slug) {
    const doc = await firestore.collection('rooms').doc(slug).get();
    const room = { id: doc.id, ...doc.data() };
    const links = []
    const snapshotLinks = await firestore.collection('rooms').doc(slug).collection('links').orderBy('created').get()
    snapshotLinks.forEach(snap => {
        links.push(snap.data().link)
    })
    room['links'] = links
    const snippets = []
    const snapshotSnippets = await firestore.collection('rooms').doc(slug).collection('snippets').orderBy('created').get()
    snapshotSnippets.forEach(snap => {
        const { language, snippet } = snap.data()
        snippets.push({ language, snippet })
    })
    room['snippets'] = snippets
    return room;
}

export async function checkIfRoomExists(slug) {
    const room = await firestore.collection('rooms').doc(slug).get()
    return room.exists
}

export async function getRoomsPaths() {
    const snapshot = await firestore.collection('rooms').get();
    const paths = [];
    snapshot.forEach((doc) => {
        paths.push({
            params: {
                slug: doc.id
            }
        });
    });
    return paths;
}

export const getRoomCollection = (slug, collection) => {
    return firestore.collection('rooms')
        .doc(slug)
        .collection(collection)
        .orderBy('created')
        .get();
}

export const streamRoomCollection = (slug, observer, collection) => {
    return firestore.collection('rooms')
        .doc(slug)
        .collection(collection)
        .orderBy('created')
        .onSnapshot(observer);
};

export const addCollectionItemToRoom = (data, slug, collection) => {
    console.log(data)
    return firestore.collection('rooms').doc(slug).collection(collection).add({
        ...data,
        created: firebase.firestore.FieldValue.serverTimestamp()
    })
};